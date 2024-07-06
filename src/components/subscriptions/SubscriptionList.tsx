"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { Channel, Video } from "@prisma/client";
import VideoCard from "../shared/VideoCard";

interface SubscriptionListProps {
  videos: (Video & { channel: Channel })[];
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({ videos }) => {
  useProtectedRoute({ checkChannel: false });

  return (
    <div className="mx-12 sm:mx-24 py-8 grid gridcols1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {videos.map((video) => {
        return <VideoCard key={video.id} video={video} channel={video.channel} channelAvatar />;
      })}
    </div>
  );
};

export default SubscriptionList;
