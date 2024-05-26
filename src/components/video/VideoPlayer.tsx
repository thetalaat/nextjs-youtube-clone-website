"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";

interface VideoPlayerProps {
  videoSrc: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const handleClickPlay = useCallback(() => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }

    setIsPlaying((isPlaying) => !isPlaying);
  }, [isPlaying, setIsPlaying]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (document.activeElement?.tagName.toLocaleLowerCase() === "input")
        return;

      const { key } = event;

      switch (key.toLowerCase()) {
        case " ":
          handleClickPlay();
        default:
          return;
      }
    },
    [handleClickPlay]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="relative w-full max-w-[1000px] flex justify-center m-auto group bg-black">
      <div
        className={`absolute bottom-0 left-0 right-0 text-white bg-gradient-to-t from-black/40 z-10 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer`}
      >
        <div className="flex items-center justify-between text-3xl">
          <div className="flex gap-2 p-3 items-center">
            <button
              className="opacity-70 transition-opacity hover:opacity-100"
              onClick={handleClickPlay}
            >
              {isPlaying ? <MdPause /> : <MdPlayArrow />}
            </button>
          </div>
        </div>
      </div>
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full aspect-video z-[5]"
        onClick={handleClickPlay}
      ></video>
    </div>
  );
};

export default VideoPlayer;
