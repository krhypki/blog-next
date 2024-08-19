"use client";

import { useFormStatus } from "react-dom";
import { Input } from "../ui/input";
import { InputHTMLAttributes } from "react";

export default function SubmitInput(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  const { pending } = useFormStatus();
  return <Input disabled={props.disabled || pending} {...props} />;
}
