import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackgroundMusicProps {
  videoId: string;
}

export interface BackgroundMusicHandle {
  play: () => Promise<void>;
  pause: () => void;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const BackgroundMusic = forwardRef<BackgroundMusicHandle, BackgroundMusicProps>(({ videoId }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const playerRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (playerRef.current && isReady) {
        playerRef.current.playVideo();
        setIsPlaying(true);
        return Promise.resolve();
      }
      return Promise.reject(new Error("Player not ready"));
    },
    pause: () => {
      if (playerRef.current && isReady) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      }
    },
  }), [isReady]);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    } else if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }

    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player("music-player", {
        height: "0",
        width: "0",
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          mute: 1, // start muted to allow autoplay
          loop: 1,
          playlist: videoId,
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            event.target.mute();
            event.target.playVideo();
          },
        },
      });
    };

    return () => {
      if (playerRef.current?.destroy) playerRef.current.destroy();
    };
  }, [videoId]);

  const toggleMusic = () => {
    if (!isReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.unMute();
      playerRef.current.playVideo();
      setIsPlaying(true);
      setShowHint(false);
    }
  };

  return (
    <>
      {/* Hidden player */}
      <div
        id="music-player"
        className="fixed -left-[9999px] -top-[9999px] w-0 h-0 overflow-hidden pointer-events-none"
      />

      {/* Floating Music Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-3">
        <Button
          onClick={toggleMusic}
          variant="outline"
          size="icon"
          className={`relative h-16 w-16 bg-background/80 backdrop-blur-md hover:bg-background/90 
            transition-all rounded-full shadow-2xl border-pink-400/50 
            ${showHint ? "animate-pulse ring-8 ring-pink-400/70 shadow-pink-300/50" : ""}`}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Volume2 className="w-8 h-8 text-pink-500 drop-shadow-md" />
          ) : (
            <VolumeX className="w-8 h-8 text-muted-foreground drop-shadow-md" />
          )}
        </Button>

        {showHint && (
          <div
            className="text-sm text-white font-playfair px-4 py-2 rounded-xl bg-pink-500 shadow-lg 
            animate-bounce backdrop-blur-sm border border-pink-300/70 
            ring-4 ring-pink-400/60 shadow-pink-400/70 transition-all"
            style={{
              textShadow: "0 0 8px rgba(255,255,255,0.8)",
              boxShadow: "0 0 20px rgba(255,182,193,0.8)",
            }}
          >
            🎶 Tap to start music
          </div>
        )}
      </div>
    </>
  );
});

export default BackgroundMusic;
