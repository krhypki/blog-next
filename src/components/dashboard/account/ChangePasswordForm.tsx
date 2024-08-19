"use client";

import { changePassword } from "@/actions/user";
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
import { passwordSchema } from "@/lib/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type formSchema = z.infer<typeof passwordSchema>;

export default function ChangePasswordForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<formSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: formSchema) => {
    setIsPending(true);
    const response = await changePassword(values);

    if (response && "error" in response) {
      toast.error(response.error);
    }

    toast.success("Password changed successfully");
    setIsPending(false);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="space-y-8 max-w-[400px] max-lg:border-b max-lg:pb-10 lg:border-r px-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Min. 8 characters long"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
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
