import { useId, type InputHTMLAttributes } from "react";

export type TextFieldProps = {
  /** Visible label above the field. Always required: a placeholder is not a label. */
  label: string;
  /** Helper text under the field. */
  hint?: string;
  /** Error message. When set, the field turns red and the message appears with an icon. */
  error?: string;
  /** Turns the field off. A reason is always shown under it. */
  disabled?: boolean;
  /** Why the field is off. Shown under a disabled field. */
  disabledReason?: string;
  /** Marks the field as required: adds * to the label and the required attribute. */
  required?: boolean;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "disabled" | "required" | "id">;

const focus = "outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent";

/**
 * Single-line text field with a label, helper text and an error state.
 */
export function TextField({
  label,
  hint,
  error,
  disabled = false,
  disabledReason = "Not available right now",
  required = false,
  className = "",
  ...rest
}: TextFieldProps) {
  const id = useId();
  const noteId = `${id}-note`;
  const invalid = Boolean(error) && !disabled;
  const note = disabled ? disabledReason : hint;
  const border = invalid ? "border-danger" : "border-ink-muted enabled:hover:border-ink focus-visible:border-ink";

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="font-body text-caption font-semibold text-ink">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        disabled={disabled}
        required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid || note ? noteId : undefined}
        className={`w-full rounded-control border-2 bg-canvas px-4 py-3 font-body text-body text-ink placeholder:text-ink-muted disabled:cursor-not-allowed disabled:opacity-50 ${border} ${focus}`}
        {...rest}
      />
      {invalid ? (
        <p id={noteId} role="alert" className="flex items-center gap-2 font-body text-caption text-danger">
          <svg aria-hidden viewBox="0 0 16 16" fill="none" className="size-4 shrink-0">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="11" r="0.9" fill="currentColor" />
          </svg>
          {error}
        </p>
      ) : note ? (
        <p id={noteId} className="font-body text-caption text-ink-muted">
          {note}
        </p>
      ) : null}
    </div>
  );
}
