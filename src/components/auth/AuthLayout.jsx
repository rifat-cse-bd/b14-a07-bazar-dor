import Link from "next/link";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="mx-auto flex max-w-[448px] flex-col gap-6 px-4 py-10">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl leading-8 font-bold">{title}</h1>
        <p className="text-sm leading-5">{subtitle}</p>
      </div>
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 sm:p-[25px]">{children}</div>
      <Link href="/" className="text-center text-sm leading-5 hover:text-primary">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 bg-base-300" />
      <span className="text-xs leading-4">অথবা</span>
      <span className="h-px flex-1 bg-base-300" />
    </div>
  );
}

// Only allow redirects back into this site
export function safeCallbackUrl(value) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}
