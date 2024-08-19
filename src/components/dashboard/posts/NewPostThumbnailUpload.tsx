"use client";

import { findLastPost } from "@/actions/db/post";
import { uploadThumbnail } from "@/actions/post";
import ButtonWLoader from "@/components/general/ButtonWLoader";
import Heading from "@/components/general/Heading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ImageUploader } from "@/components/general/image-uploader/ImageUploader";
import { useNewPostContext } from "@/hooks/contexts";
import { useState } from "react";
import { toast } from "sonner";

export default function NewPostThumbnailUpload() {
  const { handleThumbnailUpdate } = useNewPostContext();
  const [image, setImage] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    if (!image) {
      return;
    }

    setIsPending(true);

    await findLastPost();
    const formData = new FormData();
    formData.append("image", image);

    const { imageUrl, error } = await uploadThumbnail(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Thumbnail uploaded successfully");
    }

    if (imageUrl) {
      handleThumbnailUpdate(imageUrl);
    }

    setIsPending(false);
    setImage(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogTrigger asChild>
        <Button className="mb-8 max-w-[200px] w-full mx-auto">
          Upload thumbnail
        </Button>
      </DialogTrigger>
      <DialogContent className="justify-center py-10">
        <Heading tag="h3" className="text-center">
          new post thumbnail
        </Heading>

        <ImageUploader
          imageAlt="new post thumbnail"
          onImageChange={(file) => setImage(file)}
        />

        <ButtonWLoader
          disabled={!image || isPending}
          variant="secondary"
          className="mt-10"
          loading={isPending}
          onClick={handleClick}
        >
          Upload
        </ButtonWLoader>
      </DialogContent>
    </Dialog>
  );
}
