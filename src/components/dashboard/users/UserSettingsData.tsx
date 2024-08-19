"use client";
import { updateUserSettings } from "@/actions/admin";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, UserRole } from "@/lib/types/database";
import { userSettingsSchema } from "@/lib/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type FormSchema = z.infer<typeof userSettingsSchema>;

type UserSettingsProps = {
  initialValues: FormSchema;
  email: User["email"];
};

export default function UserSettingsData({
  initialValues,
  email,
}: UserSettingsProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: initialValues || {
      email: "",
      role: null,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const error = await updateUserSettings(email, data);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("User data updated");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <Heading tag="h2" variant="h4">
          Update user settings
        </Heading>

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(UserRole).map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <Button variant="secondary">Update Data</Button>
      </form>
    </Form>
  );
}
