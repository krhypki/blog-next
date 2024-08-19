"use client";

import { changeUserPassword } from "@/actions/admin";
import Heading from "@/components/general/Heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/lib/types/database";
import { passwordSchema } from "@/lib/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormSchema = z.infer<typeof passwordSchema>;
type UserPasswordsChangeProps = {
  email: User["email"];
};

export default function UserPasswordChange({
  email,
}: UserPasswordsChangeProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const error = await changeUserPassword(email, data.password);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("User password updated");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <Heading tag="h2" variant="h4">
          Update user password
        </Heading>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
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
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <Button type="submit">Update password</Button>
      </form>
    </Form>
  );
}
