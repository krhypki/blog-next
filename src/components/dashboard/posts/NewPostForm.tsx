"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNewPostContext } from "@/hooks/contexts";
import MDEditor from "@uiw/react-md-editor";
import CategorySelect from "./CategorySelect";
import NewPostThumbnailUpload from "./NewPostThumbnailUpload";
import TagsInput from "@/components/general/TagsInput";
import ButtonWLoader from "@/components/general/ButtonWLoader";

type NewPostFormProps = {
  isPublished?: boolean;
};

export default function NewPostForm({ isPublished }: NewPostFormProps) {
  const { form, categories, pending, handleSubmit } = useNewPostContext();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => handleSubmit(false))}
        className="space-y-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-10">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagsInput
                  tags={form.getValues("tags")}
                  limit={3}
                  onTagsChange={(tags) => form.setValue("tags", tags)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <NewPostThumbnailUpload />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CategorySelect
                  categories={categories}
                  onChange={field.onChange}
                  value={field.value.name}
                  defaultValue={field.value.name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="intro"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intro</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <MDEditor
                  onChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  preview="edit"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <div className="flex gap-10">
          <ButtonWLoader
            loading={pending}
            variant="secondary"
            onClick={form.handleSubmit(() =>
              handleSubmit(isPublished ?? false)
            )}
          >
            Save
          </ButtonWLoader>

          {!isPublished && (
            <ButtonWLoader
              loading={pending}
              type="button"
              onClick={form.handleSubmit(() => handleSubmit(true))}
            >
              Publish
            </ButtonWLoader>
          )}
        </div>
      </form>
    </Form>
  );
}
