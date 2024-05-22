// src/app/api/gridfs/[fileId]/route.ts

import { MongoClient, ObjectId, GridFSBucket } from "mongodb";
// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";

// Load environment variables
const { DATABASE_URL } = process.env;

const client = new MongoClient(DATABASE_URL!);

export async function GET(req: NextRequest) {
  const { pathname } = parse(req.url!, true);
  const fileId = pathname!.split("/").pop();

  try {
    if (typeof fileId !== "string") {
      return new Response(null, {
        status: 400,
        statusText: "File ID must be a single string.",
      });
    }

    await client.connect();
    const db = client.db();
    const bucket = new GridFSBucket(db);

    // Retrieve the file metadata to get the MIME type
    const fileMetadata = await db
      .collection("fs.files")
      .findOne({ _id: new ObjectId(fileId) });
    console.log(fileMetadata);

    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));

    // Create a PassThrough stream to pipe the download stream to the response
    const passThrough = new ReadableStream({
      start(controller) {
        downloadStream.on("data", (chunk) => controller.enqueue(chunk));
        downloadStream.on("end", () => controller.close());
        downloadStream.on("error", (err) => {
          console.error("Stream error:", err);
          controller.error(err);
        });
      },
    });

    return new Response(passThrough);
  } catch (error) {
    console.error(error);
    return new Response(null, {
      status: 500,
      statusText: "An unknown error occurred",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const { pathname } = parse(req.url!, true);
  const fileId = pathname!.split("/").pop();

  try {
    if (typeof fileId !== "string") {
      return new Response(null, {
        status: 400,
        statusText: "File ID must be a single string.",
      });
    }

    await client.connect();
    const db = client.db();
    const bucket = new GridFSBucket(db);

    // Delete the file
    await bucket.delete(new ObjectId(fileId));

    console.log(`File deleted successfully. | ${fileId}`);

    return new Response(null, {
      status: 204,
      statusText: "File deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return new Response(null, {
      status: 500,
      statusText: "An unknown error occurred",
    });
  }
}
