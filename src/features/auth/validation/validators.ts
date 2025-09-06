import { getMsg, type MsgKey } from "./validationMessages";

export type ValidationIssue = { key: MsgKey; message: string };
export type ValidationResult = ValidationIssue[];

export function validateId(id: string): ValidationResult {
  const issues: ValidationResult = [];
  // 8~16, 영문만 또는 영문+숫자
  const ok = /^(?=.{8,16}$)(?:[A-Za-z]+|[A-Za-z][A-Za-z\d]+)$/.test(id);
  if (!ok) issues.push({ key: "id.pattern", message: getMsg("id.pattern") });
  return issues;
}

export function validatePassword(pw: string): ValidationResult {
  const issues: ValidationResult = [];
  if (pw.length < 8 || pw.length > 15) {
    issues.push({ key: "pw.length", message: getMsg("pw.length") });
  }
  if (!/^[A-Za-z\d]+$/.test(pw)) {
    issues.push({ key: "pw.chars", message: getMsg("pw.chars") });
  }
  // 영문·숫자 2종류 이상
  const hasAlpha = /[A-Za-z]/.test(pw);
  const hasDigit = /\d/.test(pw);
  if (!(hasAlpha && hasDigit)) {
    issues.push({ key: "pw.mixed", message: getMsg("pw.mixed") });
  }
  // 동일 숫자 3연속 금지
  if (/(\d)\1\1/.test(pw)) {
    issues.push({ key: "pw.repeat3", message: getMsg("pw.repeat3") });
  }
  return issues;
}

export function validatePasswordConfirm(
  pw: string,
  pwc: string
): ValidationResult {
  return pw === pwc
    ? []
    : [{ key: "pw.confirm.mismatch", message: getMsg("pw.confirm.mismatch") }];
}

export function validateNickname(nickname: string): ValidationResult {
  const issues: ValidationResult = [];
  const ok = /^(?=.{8,16}$)[A-Za-z\d]+$/.test(nickname);
  if (!ok) {
    issues.push({
      key: "nickname.pattern",
      message: getMsg("nickname.pattern"),
    });
  }
  return issues;
}
