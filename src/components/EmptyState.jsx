import Link from "next/link";

export default function EmptyState({
  title = "পেজটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।",
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-base-300 bg-base-100 px-6 py-16 text-center">
      <span className="text-6xl font-bold text-primary">৪০৪</span>
      <h1 className="text-2xl leading-8 font-bold">{title}</h1>
      <p className="max-w-md text-sm leading-5">{message}</p>
      <Link href="/" className="btn btn-sm sm:btn-md btn-primary mt-2 border-primary-strong font-semibold shadow-primary">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
