import { SearchParamValue } from "../types/general";

export function createParamsStringFromArray(
  paramsArray: [string, string | undefined][]
) {
  return paramsArray.reduce((result, [key, value]) => {
    if (!value) {
      return result;
    }

    if (!result) {
      return `?${key}=${value}`;
    }

    return result + `&${key}=${value}`;
  }, "");
}

export function getStringValueFromParam(value: SearchParamValue) {
  if (!value) {
    return "";
  }

  return typeof value === "object"
    ? value.reduce((acc, curr) => acc + curr, "")
    : value;
}

export function getParamAsString(value: SearchParamValue) {
  if (!value) {
    return "";
  }

  return typeof value === "object" ? value.join(",") : value;
}
