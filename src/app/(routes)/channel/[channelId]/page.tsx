import GetVideosByChannelId from "@/actions/GetVideosByChannelId";
import GetChannelById from "@/actions/getChannelById";
import ChannelHeader from "@/components/channel/ChannelHeader";
import VideoCard from "@/components/shared/VideoCard";

interface ChannelPageParams {
  channelId?: string;
}

export default async function ChannelPage({
  params,
}: {
  params: ChannelPageParams;
}) {
  const { channelId } = params;

  const channel = await GetChannelById({ channelId });
  const videos = await GetVideosByChannelId({ channelId });

  return channel ? (
    <div className="flex flex-col">
      <ChannelHeader channel={channel} videoCount={videos.length} />
      <div className="border-b-2 border-b-neutral-800 capitalize">
        <div className="text-center px-6 py-2 border-b-2 border-b-neutral-400 w-24 mx-auto md:mx-32">
          Videos
        </div>
      </div>
      <div className="mx-auto sm:mx-24 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {videos.map((video) => {
          return <VideoCard key={video.id} video={video} />;
        })}
      </div>
    </div>
  ) : (
    <h1>Channel not found</h1>
  );
}
