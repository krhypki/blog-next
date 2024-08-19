"use client";

import { useFormStatus } from "react-dom";
import Spinner from "../ui/Spinner";
import { Button, ButtonProps } from "../ui/button";

type FormSubmitButtonProps = ButtonProps & {
  children: React.ReactNode;
};

export default function FormSubmitButton({
  children,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} {...props}>
      {children}
      {pending && <Spinner className="border-white h-5 w-5 ml-4" />}
    </Button>
  );
}
