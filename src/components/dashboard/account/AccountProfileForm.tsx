"use client";

import { updateUserProfile } from "@/actions/user";
import ButtonWLoader from "@/components/general/ButtonWLoader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileSchema } from "@/lib/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type formSchema = z.infer<typeof profileSchema>;
type AccountProfileFormProps = {
  firstName: string | null;
  lastName: string | null;
};

export default function AccountProfileForm({
  firstName,
  lastName,
}: AccountProfileFormProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<formSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
    },
  });

  const onSubmit = async (values: formSchema) => {
    setIsPending(true);
    const response = await updateUserProfile(values);

    if (response && "error" in response) {
      toast.error(response.error);
    } else {
      toast.success("Profile updated successfully");
    }

    setIsPending(false);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-8 max-w-[400px] max-lg:border-b max-lg:pb-10 lg:border-r px-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <ButtonWLoader loading={isPending} className="w-full">
          Submit
        </ButtonWLoader>
      </form>
    </Form>
  );
}
