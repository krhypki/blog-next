import NewPostForm from "./NewPostForm";
import Heading from "@/components/general/Heading";
import NewPostPreview from "./NewPostPreview";

export default function AddNewPost() {
  return (
    <div className="grid grid-cols-2 gap-20" data-color-mode="light">
      <NewPostForm />

      <div className="flex flex-col">
        <Heading tag="h2" variant="h4">
          Preview:
        </Heading>
        <NewPostPreview />
      </div>
    </div>
  );
}
