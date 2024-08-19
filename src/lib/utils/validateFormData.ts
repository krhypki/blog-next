import { z } from "zod";
import { INVALID_FORM_DATA_RESPONSE } from "../constants";

export function validateFormData<Z extends z.ZodTypeAny = z.ZodNever>(
  formData: unknown,
  schema: Z
): { error: string } | z.infer<Z> {
  if (!(formData instanceof FormData) && typeof formData !== "object") {
    return INVALID_FORM_DATA_RESPONSE;
  }

  if (formData instanceof FormData) {
    formData = Object.fromEntries(formData.entries());
  }

  const validatedData = schema.safeParse(formData);

  if (!validatedData.success) {
    return INVALID_FORM_DATA_RESPONSE;
  }

  return validatedData.data as z.infer<Z>;
}
