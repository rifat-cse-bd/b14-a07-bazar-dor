"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import FormField from "@/components/auth/FormField";
import SocialLogin from "@/components/auth/SocialLogin";
import { AuthDivider } from "@/components/auth/AuthLayout";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name").trim();
    const image = form.get("image").trim();

    if (!name) {
      setError("নাম লিখুন");
      toast.error("নাম লিখুন");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await signUp.email({
      name,
      email: form.get("email"),
      password: form.get("password"),
      ...(image && { image }),
    });

    setLoading(false);
    if (error) {
      const message =
        error.code === "USER_ALREADY_EXISTS" || error.status === 422
          ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে"
          : error.message || "সাইন আপ ব্যর্থ হয়েছে";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField label="নাম" id="name" type="text" placeholder="আপনার নাম" autoComplete="name" required />
      <FormField label="ইমেইল" id="email" type="email" placeholder="you@example.com" autoComplete="email" required />
      <FormField
        label="ছবির লিংক (ঐচ্ছিক)"
        id="image"
        type="url"
        placeholder="https://example.com/photo.jpg"
        autoComplete="photo"
      />
      <FormField
        label="পাসওয়ার্ড"
        id="password"
        type="password"
        placeholder="কমপক্ষে ৮ অক্ষর"
        autoComplete="new-password"
        minLength={8}
        required
      />

      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary h-10 w-full border-primary-strong font-semibold shadow-primary"
      >
        {loading && <span className="loading loading-spinner loading-sm" />}
        অ্যাকাউন্ট তৈরি করুন
      </button>

      <AuthDivider />
      <SocialLogin />

      <p className="text-center text-sm leading-5">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </form>
  );
}
