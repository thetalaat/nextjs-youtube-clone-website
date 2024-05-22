"use client";

import Button from "@/components/shared/Button";
import UploadVideoModal from "@/components/shared/Modal/UploadVideoModal";
import VideoPreview from "@/components/studio/upload/VideoPreview";
import VideoUploadForm from "@/components/studio/upload/VideoUploadForm";
import { UploadVideoModalContext } from "@/context/UploadVideoModalContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function UploadPage() {
  useProtectedRoute();

  const uploadVideoModal = useContext(UploadVideoModalContext);

  useEffect(() => uploadVideoModal?.onOpen(), []);

  const videoId = useMemo(() => {
    const buffer = Buffer.alloc(12);

    return uuid({}, buffer).toString("hex");
  }, []);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      thumbnailSrc: "",
      videoSrc: "",
    },
  });

  const changeValue = (id: string, value: string) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const thumbnailSrc: string = watch("thumbnailSrc");
  const videoSrc: string = watch("videoSrc");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/video", data)
      .then(() => {
        toast.success("Video published successfully");
        router.push("/studio");
      })
      .catch(() => {
        toast.error("Could not publish video");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onCancel = () => {
    axios.delete(videoSrc);
    axios.delete(thumbnailSrc);
  };

  return (
    <>
      {uploadVideoModal?.isOpen && (
        <UploadVideoModal
          onUpload={(value) => changeValue("videoSrc", value)}
        />
      )}
      <div className="flex flex-col px-8 pt-4">
        <div className="flex justify-between">
          <h1 className="text-2xl">Video details</h1>
          <span className="flex gap-4">
            <Button
              type="secondary"
              onClick={() => {
                onCancel();
                router.back();
              }}
            >
              Cancel
            </Button>
            <Button type="box" onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          </span>
        </div>
        <div className="mt-6 flex flex-col md:flex-row gap-6 md:gap-2">
          <VideoUploadForm
            register={register}
            errors={errors}
            changeValue={changeValue}
            thumbnailSrc={thumbnailSrc}
            isLoading={isLoading}
          />
          <VideoPreview
            videoSrc={videoSrc}
            videoId={videoId}
            onCancel={onCancel}
          />
        </div>
      </div>
    </>
  );
}
