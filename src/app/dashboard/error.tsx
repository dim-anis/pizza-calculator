"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex h-full flex-col items-center justify-center space-y-4">
      <div className="text-center">
        <h2 className=" font-bold">Something went wrong!</h2>
        <p className="">{error.message}</p>
      </div>
      <Link href={"/dashboard"} className={`${buttonVariants()}`}>
        Back to dashboard
      </Link>
    </main>
  );
}
