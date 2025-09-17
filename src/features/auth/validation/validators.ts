import { getMsg, type MsgKey } from "./validationMessages";

export type ValidationIssue = { key: MsgKey; message: string };
export type ValidationResult = ValidationIssue[];

export function validateEmail(email: string): ValidationResult {
  const issues: ValidationResult = [];

  const BASIC_EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const hasExactlyOneAt = (email.match(/@/g) || []).length === 1;
  const noConsecutiveDots = !/\.\./.test(email);

  let ok = false;
  if (BASIC_EMAIL_RE.test(email) && hasExactlyOneAt && noConsecutiveDots) {
    const [local, domain] = email.split("@");
    const badEdge = (s: string) => /^[.-]/.test(s) || /[.-]$/.test(s);
    ok = !!local && !!domain && !badEdge(local) && !badEdge(domain);
  }

  if (!ok) {
    issues.push({ key: "email.pattern", message: getMsg("email.pattern") });
  }
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
