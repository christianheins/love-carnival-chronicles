import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackgroundMusicProps {
  videoId: string;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const BackgroundMusic = ({ videoId }: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('music-player', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          mute: 0,
          loop: 1,
          playlist: videoId
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            event.target.playVideo();
          }
        }
      });
    };

    // If YT is already loaded, initialize immediately
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const toggleMusic = () => {
    if (playerRef.current && isReady) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* Hidden player container */}
      <div id="music-player" className="fixed -left-[9999px] -top-[9999px] w-0 h-0 overflow-hidden pointer-events-none" />

      {/* Music toggle button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={toggleMusic}
          variant="outline"
          size="icon"
          className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-smooth rounded-full shadow-lg border-primary/20"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-primary" />
          ) : (
            <VolumeX className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    </>
  );
};

export default BackgroundMusic;