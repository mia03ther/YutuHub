export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="surface-card p-5">
          <div className="skeleton h-4 w-1/3 rounded" />
          <div className="skeleton mt-3 h-3 w-1/4 rounded" />
          <div className="skeleton mt-4 h-3 w-full rounded" />
          <div className="skeleton mt-2 h-3 w-4/5 rounded" />
          <div className="mt-5 flex gap-2">
            <div className="skeleton h-5 w-14 rounded-md" />
            <div className="skeleton h-5 w-16 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
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