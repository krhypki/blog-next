import { User } from "../types/database";
import { ImageStorageName } from "../types/image";

export function getImageUrl(storage: ImageStorageName, image: string) {
  return `${process.env.NEXT_PUBLIC_IMAGE_STORAGE_PATH}/${storage}/${image}`;
}

export function getFullName(user: User) {
  return `${user.firstName} ${user.lastName}`;
}

export function isArrayItemInString(str: string, items: string[]) {
  return items.some((item) => str.includes(item));
}
