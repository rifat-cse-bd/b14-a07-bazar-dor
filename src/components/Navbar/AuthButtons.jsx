"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import Avatar from "@/components/profile/Avatar";

const primaryButton = "btn btn-sm sm:btn-md btn-primary border-primary-strong font-semibold shadow-primary";

export default function AuthButtons() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return <div className="skeleton h-10 w-32 rounded-lg" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-sm sm:btn-md btn-ghost font-semibold">
          সাইন ইন
        </Link>
        <Link href="/signup" className={primaryButton}>
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { user } = session;
  const firstName = user.name?.split(" ")[0] || "User";

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি");
      return;
    }
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost h-10 gap-2 px-2 sm:px-4">
        <Avatar user={user} className="size-9 rounded-[10.5px] text-sm" />
        <span className="hidden text-sm font-medium sm:inline">{firstName}</span>
        <span className="text-xs opacity-60">▾</span>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-50 mt-2 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
      >
        <li className="menu-title truncate">{user.email}</li>
        <li>
          <Link href="/profile">👤 আমার প্রোফাইল</Link>
        </li>
        <li>
          <button type="button" onClick={handleSignOut}>
            ↩ সাইন আউট
          </button>
        </li>
      </ul>
    </div>
  );
}
