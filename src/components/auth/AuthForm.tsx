"use client";

import { login, signup } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ButtonWLoader from "../general/ButtonWLoader";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { authSchema } from "@/lib/zod/user";
import { AuthType } from "@/lib/types/database";

type AuthFormProps = {
  actionType: AuthType;
};

type FormSchema = z.infer<typeof authSchema>;

export default function AuthForm({ actionType }: AuthFormProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    setIsPending(true);
    let response;

    if (actionType === "login") {
      response = await login(values);
    } else {
      response = await signup(values);
    }

    if (response && "error" in response) {
      toast.error(response.error);
    }

    setIsPending(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize mb-6">{actionType}</CardTitle>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@email.pl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Minimum 8 characters"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <ButtonWLoader loading={isPending}>Submit</ButtonWLoader>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
