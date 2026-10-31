import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import SignInForm from "./SignInForm";

export const metadata = {
  title: "সাইন ইন — বাজার দর",
};

export default function SignInPage() {
  return (
    <AuthLayout title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <Suspense fallback={<div className="skeleton h-[326px] w-full" />}>
        <SignInForm />
      </Suspense>
    </AuthLayout>
  );
}
