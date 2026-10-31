"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";
import useRequireSession from "@/components/profile/useRequireSession";
import Avatar from "@/components/profile/Avatar";
import { inputClass } from "@/components/auth/FormField";

export default function ProfileView() {
  const { session } = useRequireSession();
  const router = useRouter();

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
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">
      <div className="flex flex-col">
        <h1 className="text-2xl leading-8 font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm leading-5">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      {!session ? (
        <>
          <div className="skeleton h-[122px] rounded-2xl" />
          <div className="skeleton h-[251px] rounded-2xl" />
        </>
      ) : (
        <>
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-base-300 bg-base-100 p-[25px] sm:flex-row sm:items-center">
            <Avatar user={session.user} className="h-[70px] w-20 rounded-2xl text-3xl" />
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="truncate text-xl leading-7 font-semibold">{session.user.name}</p>
              <p className="truncate text-base leading-6">{session.user.email}</p>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="btn h-10 border-error bg-transparent font-semibold text-error shadow-none hover:bg-error hover:text-error-content"
            >
              ↩ সাইন আউট
            </button>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-[21px]">
            <h2 className="text-lg leading-7 font-semibold">তথ্য</h2>
            <div className="flex flex-col gap-4 sm:p-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="profile-name" className="text-sm leading-[21px] font-medium">
                  নাম
                </label>
                <input id="profile-name" className={inputClass} value={session.user.name} readOnly />
              </div>
              <Link
                href="/profile/update"
                className="btn btn-primary h-10 w-full border-primary-strong font-semibold shadow-primary"
              >
                আপডেট
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
