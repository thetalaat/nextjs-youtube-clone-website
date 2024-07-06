import getTrendingVideos from "@/actions/getTrendingVideos";
import VideoCard from "@/components/shared/VideoCard";

export default async function Home() {
  const trendingVideos = await getTrendingVideos();

  return (
    <div className="relative mx-12 sm:mx-24 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {trendingVideos.length ? (
        trendingVideos.map((video) => {
          return <VideoCard key={video.id} video={video} channel={video.channel} channelAvatar />;
        })
      ) : (
        <div className="absolute flex justify-center items-center w-full h-[60vh]">No videos found</div>
      )}
    </div>
  );
}
