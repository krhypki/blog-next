"use client";
import { addPost, editPost } from "@/actions/post";
import { Category, Post, PostFormSchema } from "@/lib/types/database";
import { postEssentialsSchema } from "@/lib/zod/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useMemo,
  useTransition,
} from "react";
import { UseFormReturn, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

type NewPostContextProviderProps = {
  children: React.ReactNode;
  initialValues?: PostFormSchema;
  mode?: "edit" | "add";
  categories: Category[];
} & (
  | {
      mode: "edit";
      postId: Post["id"];
    }
  | {
      mode: "add";
      postId?: never;
    }
);

type NewPostContextType = {
  form: UseFormReturn<PostFormSchema>;
  formValues: PostFormSchema;
  categories: Category[];
  pending: boolean;
  handleThumbnailUpdate: (url: string) => void;
  handleSubmit: (published?: boolean) => void;
};

export const NewPostContext = createContext<NewPostContextType | null>(null);

export default function NewPostContextProvider({
  children,
  categories,
  mode,
  postId,
  initialValues,
}: NewPostContextProviderProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const form = useForm<PostFormSchema>({
    resolver: zodResolver(postEssentialsSchema),
    defaultValues: initialValues || {
      title: "",
      intro: "",
      content: "",
      thumbnail: "",
      tags: [],
      category: {},
    },
  });

  const formValues = useWatch({ control: form.control }) as PostFormSchema;

  const handleThumbnailUpdate = useCallback(
    async (url: string) => {
      form.setValue("thumbnail", url);
    },
    [form]
  );

  const handleSubmit = useCallback(
    async (publish = false) => {
      startTransition(async () => {
        let response;
        if (mode === "edit") {
          response = await editPost({
            id: postId,
            postData: formValues,
            publish,
          });
        } else {
          response = await addPost(formValues, publish);
        }

        if (response && "error" in response) {
          toast.error(response.error);

          return;
        }

        toast.success(
          `Post ${mode === "edit" ? "updated" : "added"} successfully`
        );
        router.push("/dashboard/posts");
      });
    },
    [formValues, mode, postId, router]
  );

  return (
    <NewPostContext.Provider
      value={useMemo(
        () => ({
          form,
          formValues,
          categories,
          pending,
          handleThumbnailUpdate,
          handleSubmit,
        }),
        [
          form,
          formValues,
          categories,
          pending,
          handleSubmit,
          handleThumbnailUpdate,
        ]
      )}
    >
      {children}
    </NewPostContext.Provider>
  );
}
