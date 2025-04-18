import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="container mx-auto space-y-12 py-8 lg:py-12">
      <div className="mx-auto max-w-3xl flex flex-col gap-4 items-center text-center">
        <h2 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]">
          Let&apos;s get this bread!
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Creating an account gives you access to powerful tools built for
          serious home bakers and professionals alike.
        </p>
        <Link href="/dashboard" className={`${buttonVariants({ size: "lg" })}`}>
          Create a free account
        </Link>
      </div>
    </section>
  );
}
