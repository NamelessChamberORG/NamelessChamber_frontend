export type MsgKey =
  | "id.pattern"
  | "pw.length"
  | "pw.chars"
  | "pw.mixed"
  | "pw.repeat3"
  | "pw.confirm.mismatch";

const MESSAGES: Record<MsgKey, string> = {
  "id.pattern": "8~16자의 영문 또는 영문+숫자 조합",
  "pw.length": "최소 8자 이상 입력",
  "pw.chars": "영문 / 숫자(공백 제외)만 허용",
  "pw.mixed": "영문과 숫자를 2개 이상 조합",
  "pw.repeat3": "동일한 숫자 3개 이상 연속 사용 불가",
  "pw.confirm.mismatch": "동일한 비밀번호를 입력",
};

export function getMsg(key: MsgKey) {
  return MESSAGES[key];
}
