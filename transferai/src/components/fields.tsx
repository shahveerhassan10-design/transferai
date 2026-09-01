import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

const controlClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-blue-700 focus:ring-2 focus:ring-blue-100";

export function FieldShell({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[14px] font-medium text-ink">
        {label}
        {required && <span className="text-blue-700"> *</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-[13px] text-ink-soft">{hint}</span>}
    </label>
  );
}

export function TextField({
  label,
  hint,
  required,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; required?: boolean }) {
  return (
    <FieldShell label={label} hint={hint} required={required}>
      <input className={controlClass} required={required} {...props} />
    </FieldShell>
  );
}

const chevronSvg =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%234c5c7a" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>'
  );

export function SelectField({
  label,
  hint,
  required,
  options,
  placeholder = "Select an option",
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
  required?: boolean;
  options: string[];
  placeholder?: string;
}) {
  return (
    <FieldShell label={label} hint={hint} required={required}>
      <select
        className={`${controlClass} appearance-none bg-no-repeat pr-9`}
        style={{ backgroundImage: `url("${chevronSvg}")`, backgroundPosition: "right 0.9rem center" }}
        required={required}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
