import EmptyState from "@/components/EmptyState";

export const metadata = {
  title: "পেজটি পাওয়া যায়নি — বাজার দর",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <EmptyState />
    </div>
  );
}
