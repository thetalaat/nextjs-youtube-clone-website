"use client";

import IconButton from "@/components/shared/IconButton";
import { useEffect, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface VideoPreviewProps {
  videoId: string;
  videoSrc: string;
  onCancel: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoId,
  videoSrc,
  onCancel,
}) => {
  const router = useRouter();

  const [videoLink, setVideoLink] = useState("");
  useEffect(() => {
    setVideoLink(`${window.location.host}/video/${videoId}`);
  }, [videoId]);

  const copyLink = () => {
    navigator.clipboard
      .writeText(videoLink)
      .then(() => toast.success("Link copied to clipboard"));
  };

  const deleteVideo = () => {
    onCancel();
    router.back();
  };

  return (
    <div className="w-full md-w-2/5 flex flex-col overflow-hidden rounded-md">
      <video controls className="max-h-80 md:max-h-full">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="bg-stone-900 p-4 flex justify-between items-center">
        <div className="w-4/5 truncate">
          <div className="text-sm text-zinc-400">Video Link</div>
          <a href={videoSrc} className="text-sky-500">
            {videoLink}
          </a>
        </div>
        <IconButton onClick={copyLink}>
          <MdOutlineContentCopy className="cursor-pointer" />
        </IconButton>
        {/* <IconButton onClick={deleteVideo}>
          <MdOutlineDelete className="cursor-pointer text-red-500 w-[22px] h-[22px]" />
        </IconButton> */}
      </div>
    </div>
  );
};

export default VideoPreview;
