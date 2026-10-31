export const inputClass =
  "h-10 w-full rounded-lg border border-base-300 bg-base-100 px-[13px] text-sm leading-[21px] outline-none placeholder:text-base-content/60 focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function FormField({ label, id, ...inputProps }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm leading-[21px] font-medium">
        {label}
      </label>
      <input id={id} name={id} className={inputClass} {...inputProps} />
    </div>
  );
}
