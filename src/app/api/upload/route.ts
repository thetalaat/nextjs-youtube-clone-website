// src/app/api/upload/route.ts

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/vendor/db";
import { MongoClient, GridFSBucket } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Load environment variables
const { DATABASE_URL } = process.env;

// Initialize MongoDB connection
const client = new MongoClient(DATABASE_URL!);
await client.connect();
const db = client.db();
const bucket = new GridFSBucket(db);

export async function POST(request: NextRequest) {
  // Check current user
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ success: false, error: "Unauthorized" });
  }

  // Process the file
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, error: "No file uploaded" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create a GridFS upload stream for the file
  const uploadStream = bucket.openUploadStream(file.name);

  // Convert the file buffer into a readable stream and pipe to GridFS
  uploadStream.end(buffer);

  return new Promise((resolve, reject) => {
    uploadStream.on("finish", () => {
      resolve(
        NextResponse.json({
          success: true,
          file: { path: `/api/gridfs/${uploadStream.id}` },
        })
      );
    });
    uploadStream.on("error", (error) => {
      reject(NextResponse.json({ success: false, error: error.message }));
    });
  });
}
