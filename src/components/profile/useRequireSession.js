"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

// Client-side guard for pages the proxy lets through with a stale cookie
export default function useRequireSession() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "protected-route" });
      router.replace(`/signin?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, router, pathname]);

  return { session, isPending };
}
