import prisma from "@/vendor/db";
import { Channel, Video } from "@prisma/client";
import getCurrentUser from "./getCurrentUser";

export default async function getSubscriptionVideos(): Promise<(Video & { channel: Channel })[]> {
  const currentUser = await getCurrentUser();
  try {
    const videos = await prisma.video.findMany({
      where: {
        channelId: {
          in: currentUser?.subscribedChannelIds,
        },
      },
      include: {
        channel: true,
      },
      orderBy: [{ createdAt: "desc" }],
    });

    return videos;
  } catch (error: any) {
    throw new Error(error);
  }
}
