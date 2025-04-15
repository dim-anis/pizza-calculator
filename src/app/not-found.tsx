import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center space-y-4 align-middle min-h-svh">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center">
          <span className="text-9xl font-medium">4</span>
          <Icons.toast className="h-32 w-32" />
          <span className="text-9xl font-medium">4</span>
        </div>
        <h2 className="font-bold">This page is toast!</h2>
      </div>
      <Link href="/dashboard" className={`${buttonVariants()}`}>
        Back to dashboard
      </Link>
    </div>
  );
}
