import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackgroundMusicProps {
  url: string;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <>
      {/* Hidden background player */}
      <ReactPlayer
        url={url}
        playing={isPlaying}
        muted={isMuted}
        loop
        width="0"
        height="0"
        style={{ display: "none" }}
      />

      {/* Controls */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-3">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          variant="outline"
          size="icon"
          className="bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full shadow-lg border-primary/20"
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-primary" />
          ) : (
            <VolumeX className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>

        <Button
          onClick={() => setIsMuted(!isMuted)}
          variant="outline"
          size="icon"
          className="bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full shadow-lg border-primary/20"
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
