import { CardGridSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
      <div className="skeleton h-3 w-24 rounded" />
      <div className="skeleton mt-4 h-9 w-64 rounded" />
      <div className="skeleton mt-4 h-4 w-full max-w-xl rounded" />
      <div className="mt-12">
        <CardGridSkeleton />
      </div>
    </div>
  );
}