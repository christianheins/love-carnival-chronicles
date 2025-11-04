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
  const [showPopup, setShowPopup] = useState(true);
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
        videoId: videoId,
        playerVars: {
          autoplay: 0, // start manually
          controls: 0,
          mute: 1, // start muted
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

  // 🔊 Handles user activating audio manually
  const handleDoubleClick = () => {
    if (playerRef.current && isReady) {
      playerRef.current.unMute();
      playerRef.current.playVideo();
      setIsPlaying(true);
      setShowPopup(false);
    }
  };

  const toggleMusic = () => {
    if (playerRef.current && isReady) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      {/* Hidden player */}
      <div
        id="music-player"
        className="fixed -left-[9999px] -top-[9999px] w-0 h-0 overflow-hidden pointer-events-none"
      />

      {/* Music button */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center space-y-2">
        <Button
          onClick={toggleMusic}
          onDoubleClick={handleDoubleClick}
          variant="outline"
          size="icon"
          className={`relative bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all rounded-full shadow-lg border-primary/20 ${
            showPopup ? "animate-pulse ring-4 ring-pink-400 ring-opacity-60" : ""
          }`}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-primary" />
          ) : (
            <VolumeX className="w-5 h-5 text-muted-foreground" />
          )}
        </Button>

        {showPopup && (
          <div className="text-xs text-pink-600 font-playfair bg-white/90 px-3 py-1 rounded-lg shadow-md animate-bounce">
            🎶 Double click me to start music!
          </div>
        )}
      </div>
    </>
  );
});

export default BackgroundMusic;
