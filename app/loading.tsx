export default function Loading() {
  return (
    <div className="flex flex-col gap-5">
      <div className="h-16 w-72 animate-pulse rounded-2xl bg-card" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-40 animate-pulse rounded-2xl bg-card" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="h-80 animate-pulse rounded-2xl bg-card xl:col-span-2" />
        <div className="h-80 animate-pulse rounded-2xl bg-card" />
      </div>
    </div>
  );
}
