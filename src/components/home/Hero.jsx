import Image from "next/image";
import BanglaDate from "@/components/BanglaDate";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-base-300 bg-base-100">
      <div className="flex flex-col items-center gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between md:py-10">
        <div className="flex max-w-xl flex-col items-start gap-2">
          <BanglaDate className="min-h-7 rounded-[14px] bg-primary/10 px-3 py-1 text-sm leading-5 font-medium text-primary" />
          <h1 className="text-3xl leading-[1.25] font-bold sm:text-4xl sm:leading-[45px]">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-1 text-base leading-6">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
            সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn btn-sm sm:btn-md btn-primary mt-3 border-primary-strong font-semibold shadow-primary"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <Image
          src="/bazar-hero.png"
          alt="সবজি ও ফলের ঝুড়ি"
          width={315}
          height={263}
          priority
          className="w-56 shrink-0 sm:w-64 md:w-[315px]"
        />
      </div>
    </section>
  );
}
