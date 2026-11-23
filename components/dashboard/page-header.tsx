export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-[28px]">{title}</h1>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      {children}
    </div>
  );
}
