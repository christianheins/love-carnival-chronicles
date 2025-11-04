import React, { useState } from "react";
import ReactPlayer from "react-player/soundcloud";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackgroundMusicProps {
  url: string;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <>
      <ReactPlayer
        url={url}
        playing={isPlaying}
        muted={isMuted}
        loop
        width="0"
        height="0"
        style={{ display: "none" }}
      />

      <div className="fixed bottom-4 right-4 z-50 flex gap-3 opacity-90 hover:opacity-100 transition-all">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          variant="outline"
          size="icon"
          className="bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full shadow-lg border-primary/20"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-primary" />
          ) : (
            <Play className="w-4 h-4 text-primary" />
          )}
        </Button>

        <Button
          onClick={() => setIsMuted(!isMuted)}
          variant="outline"
          size="icon"
          className="bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full shadow-lg border-primary/20"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Volume2 className="w-4 h-4 text-primary" />
          )}
        </Button>
      </div>
    </>
  );
};

export default BackgroundMusic;
