export type RangeId = "7d" | "30d" | "month" | "quarter";

export const rangeOptions: { id: RangeId; label: string }[] = [
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "month", label: "This month" },
  { id: "quarter", label: "This quarter" },
];

export function greetingFor(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function formatLongDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function rangeCaption(id: RangeId, now = new Date()) {
  const start = new Date(now);
  if (id === "7d") start.setDate(now.getDate() - 6);
  if (id === "30d") start.setDate(now.getDate() - 29);
  if (id === "month") start.setDate(1);
  if (id === "quarter") {
    const quarterStart = Math.floor(now.getMonth() / 3) * 3;
    start.setMonth(quarterStart, 1);
  }

  const sameYear = start.getFullYear() === now.getFullYear();
  const left = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: sameYear ? undefined : "numeric",
  });
  const right = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${left} – ${right}`;
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatAxisMoney(value: number) {
  if (Math.abs(value) >= 1000) return `$${Math.round(value / 1000)}k`;
  return `$${Math.round(value)}`;
}
