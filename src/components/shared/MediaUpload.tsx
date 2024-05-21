// src/components/shared/MediaUpload.tsx

"use client";
import axios from "axios";
import React, { useState, useRef } from "react";

interface MediaUploadProps {
  onChange: (value: string) => void;
}

const MediaUpload: React.FC<React.PropsWithChildren<MediaUploadProps>> = ({
  onChange,
  children,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("MediaUpload | start");

    try {
      const data = new FormData();
      data.set("file", file);

      const response = await axios.post("/api/upload", data);

      if (response && response.status === 200) {
        onChange(response.data.file.path);
        console.log(
          "MediaUpload | File uploaded successfully:",
          response.data.file.path
        );
      } else {
        console.error("MediaUpload | Failed to upload file");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div onClick={handleButtonClick}>{children}</div>
    </div>
  );
};

export default MediaUpload;
