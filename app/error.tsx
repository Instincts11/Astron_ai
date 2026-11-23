"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="grid min-h-[50vh] place-items-center">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted">
          The workspace hit an unexpected error. You can load this view again.
        </p>
        <Button className="mt-5" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
