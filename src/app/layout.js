import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজার দর",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="bazardor"
      className={`${hindSiliguri.variable} h-full antialiased`}
    >
      {/* Browser extensions (e.g. ColorZilla) add attributes to body before React loads */}
      <body className="flex min-h-full flex-col bg-base-200 text-base-content" suppressHydrationWarning>
        <Navbar />
        <Ticker />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ style: { fontFamily: "inherit" } }} />
      </body>
    </html>
  );
}
