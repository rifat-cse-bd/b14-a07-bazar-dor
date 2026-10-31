"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

const PROVIDERS = [
  { id: "google", label: "Google দিয়ে চালিয়ে যান", icon: "/icons/google.svg" },
  { id: "github", label: "GitHub দিয়ে চালিয়ে যান", icon: "/icons/github.svg" },
];

export default function SocialLogin({ callbackUrl = "/" }) {
  const [pending, setPending] = useState(null);

  const handleClick = async (provider) => {
    setPending(provider);
    // On success the browser is redirected to the provider, so only errors come back here
    const { error } = await signIn.social({
      provider,
      callbackURL: callbackUrl,
      errorCallbackURL: "/signin",
    });
    if (error) {
      toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
      setPending(null);
    }
  };

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {PROVIDERS.map((provider) => (
        <button
          key={provider.id}
          type="button"
          onClick={() => handleClick(provider.id)}
          disabled={pending !== null}
          className="btn h-10 flex-nowrap gap-1.5 border-base-300 bg-base-100 px-2 text-sm font-semibold whitespace-nowrap shadow-none hover:bg-base-200"
        >
          {pending === provider.id ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <Image src={provider.icon} alt="" width={13.4} height={13.4} />
          )}
          {provider.label}
        </button>
      ))}
    </div>
  );
}
