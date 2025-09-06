import type { ValidationResult } from "./validators";

export function firstError(result: ValidationResult) {
  return result[0]?.message ?? "";
}
export function hasError(result: ValidationResult) {
  return result.length > 0;
}
