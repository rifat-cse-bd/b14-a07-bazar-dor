"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";
import useRequireSession from "@/components/profile/useRequireSession";
import FormField from "@/components/auth/FormField";

export default function UpdateProfileForm() {
  const { session } = useRequireSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("name").trim();

    if (!name) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }
    if (name === session.user.name) {
      toast("নামে কোনো পরিবর্তন হয়নি");
      return;
    }

    setLoading(true);
    const { error } = await updateUser({ name });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">
      <div className="flex flex-col">
        <h1 className="text-2xl leading-8 font-bold">তথ্য আপডেট করুন</h1>
        <p className="text-sm leading-5">আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।</p>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <h2 className="text-lg leading-7 font-semibold">তথ্য</h2>
        {!session ? (
          <div className="skeleton h-[121px] sm:m-6" />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:p-6">
            <FormField
              label="নাম"
              id="name"
              type="text"
              defaultValue={session.user.name}
              autoComplete="name"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary h-10 w-full border-primary-strong font-semibold shadow-primary"
            >
              {loading && <span className="loading loading-spinner loading-sm" />}
              তথ্য আপডেট করুন
            </button>
          </form>
        )}
      </div>

      <Link href="/profile" className="text-center text-sm leading-5 hover:text-primary">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}
