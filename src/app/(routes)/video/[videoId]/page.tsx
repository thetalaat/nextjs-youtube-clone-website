import increaseVideoViewCount from "@/actions/increaseVideoViewCount";

interface VideoPageParams {
  videoId?: string;
}

export default async function VideoPage({
  params,
}: {
  params: VideoPageParams;
}) {
  const { videoId } = params;

  const video = await increaseVideoViewCount({ videoId });

  return video ? (
    <div className="W-full md:w-2/5">{videoId}</div>
  ) : (
    <h1>Video not found</h1>
  );
}
