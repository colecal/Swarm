import { forwardRef, type InputHTMLAttributes } from "react";
import { clsx } from "clsx";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label?: string }
>(({ label, className, id, ...props }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-neutral-400">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={clsx(
          "w-full rounded-lg border border-neutral-700/60 bg-surface-3 px-3 py-2 text-sm text-neutral-100",
          "placeholder:text-neutral-600",
          "focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30",
          "transition-colors duration-150",
          className
        )}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";
