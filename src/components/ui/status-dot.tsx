import { clsx } from "clsx";

const statusColors: Record<string, string> = {
  active: "bg-success",
  running: "bg-info animate-pulse-subtle",
  idle: "bg-neutral-500",
  pending: "bg-warning",
  completed: "bg-success",
  failed: "bg-danger",
  error: "bg-danger",
  disabled: "bg-neutral-700",
  paused: "bg-warning",
  queued: "bg-info",
  timeout: "bg-danger",
  cancelled: "bg-neutral-600",
  archived: "bg-neutral-700",
};

export function StatusDot({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-block h-2 w-2 rounded-full",
        statusColors[status] || "bg-neutral-500",
        className
      )}
      title={status}
    />
  );
}
