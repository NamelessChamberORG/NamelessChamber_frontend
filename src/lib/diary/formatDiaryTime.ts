export function formatDiaryTime(
  createdAt: string | number | Date,
  now: Date = new Date()
): string {
  const tz = "Asia/Seoul";
  const start = new Date(createdAt);
  const diffMs = Math.max(0, now.getTime() - start.getTime());
  const minMs = 1000 * 60;
  const hourMs = minMs * 60;
  const dayMs = hourMs * 24;
  const weekMs = dayMs * 7;
  const fourWeeksMs = dayMs * 28;

  if (diffMs < hourMs) {
    const mins = Math.max(1, Math.floor(diffMs / minMs));
    return `${mins}분 전에 작성한 글입니다`;
  }
  if (diffMs < dayMs) {
    const hours = Math.max(1, Math.floor(diffMs / hourMs));
    return `${hours}시간 전에 작성한 글입니다`;
  }
  if (diffMs < weekMs) {
    const days = Math.max(1, Math.floor(diffMs / dayMs));
    return `${days}일 전에 작성한 글입니다`;
  }
  if (diffMs < fourWeeksMs) {
    const weeks = Math.max(1, Math.floor(diffMs / weekMs));
    return `${weeks}주일 전에 작성한 글입니다`;
  }

  const fmt = new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
    timeZone: tz,
  });
  const md = fmt.format(start);
  const [m, d] = md
    .replaceAll(" ", "")
    .replaceAll(".", "")
    .split("")
    .reduce<string[]>((acc, ch) => {
      if (/\d/.test(ch)) acc.push(ch);
      return acc;
    }, [])
    .join("")
    .match(/(\d{1,2})(\d{1,2})/)!
    .slice(1, 3);

  return `${Number(m)}월 ${Number(d)}일에 작성한 글입니다`;
}
