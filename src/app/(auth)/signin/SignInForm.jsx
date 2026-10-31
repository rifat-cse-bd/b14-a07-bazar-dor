"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import FormField from "@/components/auth/FormField";
import SocialLogin from "@/components/auth/SocialLogin";
import { AuthDivider, safeCallbackUrl } from "@/components/auth/AuthLayout";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = safeCallbackUrl(searchParams.get("callbackUrl"));
  const reason = searchParams.get("reason");
  const socialError = searchParams.get("error");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fixed ids stop the toasts from showing twice in development
    if (reason === "protected") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "protected-route" });
    }
    if (socialError) {
      toast.error("সোশ্যাল লগইন ব্যর্থ হয়েছে, আবার চেষ্টা করুন", { id: "social-error" });
    }
  }, [reason, socialError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    setError("");

    const { error } = await signIn.email({
      email: form.get("email"),
      password: form.get("password"),
    });

    setLoading(false);
    if (error) {
      const message =
        error.status === 401 ? "ইমেইল বা পাসওয়ার্ড সঠিক নয়" : error.message || "সাইন ইন ব্যর্থ হয়েছে";
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("সাইন ইন সফল হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField label="ইমেইল" id="email" type="email" placeholder="you@example.com" autoComplete="email" required />
      <FormField
        label="পাসওয়ার্ড"
        id="password"
        type="password"
        placeholder="কমপক্ষে ৮ অক্ষর"
        autoComplete="current-password"
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
        সাইন ইন
      </button>

      <AuthDivider />
      <SocialLogin callbackUrl={callbackUrl} />

      <p className="text-center text-sm leading-5">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}
