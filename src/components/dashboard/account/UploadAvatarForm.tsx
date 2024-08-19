import { uploadAvatar } from "@/actions/user";
import FormSubmitButton from "@/components/general/FormSubmitButton";
import { ImageUploader } from "@/components/general/image-uploader/ImageUploader";
import { AVATAR_PLACEHOLDER_PATH } from "@/lib/constants";
import { getImageUrl } from "@/lib/utils/stringUtils";

type UploadAvatarFormProps = {
  avatarPath: string | null;
};

export default function UploadAvatarForm({
  avatarPath,
}: UploadAvatarFormProps) {
  const placeholderPath = getImageUrl("avatars", AVATAR_PLACEHOLDER_PATH);
  const initialImage = avatarPath
    ? getImageUrl("avatars", avatarPath)
    : placeholderPath;

  return (
    <form
      action={async (formData) => {
        "use server";
        await uploadAvatar(formData, avatarPath ? "update" : "upload");
      }}
      className="flex flex-col items-center gap-y-10"
    >
      <ImageUploader
        variant="avatar"
        imageAlt="User avatar preview"
        initialImage={initialImage}
      />
      <FormSubmitButton className="capitalize mt-2" size="lg">
        Upload
      </FormSubmitButton>
    </form>
  );
}
