import prisma from "@/vendor/db";
import { NextResponse } from "next/server";

interface Iparams {
  videoId: string;
}

export async function POST(request: Request, { params }: { params: Iparams }) {
  const { videoId } = params;
  const { text, channelId } = await request.json();

  if (!videoId || !channelId || !text) {
    return NextResponse.error();
  }

  const comment = await prisma.comment.create({
    data: {
      videoId,
      channelId,
      text,
    },
  });

  return NextResponse.json({ comment });
}
