// 회원가입일(자정 기준) ~ 오늘(자정 기준)까지 지난 '일 수'를 계산합니다.
// 가입 당일은 D+0 입니다.
export function daysSince(dateISO: string | Date): number {
  const toLocalStartOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const signup = typeof dateISO === "string" ? new Date(dateISO) : dateISO;
  if (isNaN(signup.getTime())) return 0;

  const today = new Date();
  const a = toLocalStartOfDay(signup);
  const b = toLocalStartOfDay(today);
  const diffMs = b.getTime() - a.getTime();
  return Math.max(0, Math.floor(diffMs / 86400000)); // 1일 = 86,400,000 ms
}
