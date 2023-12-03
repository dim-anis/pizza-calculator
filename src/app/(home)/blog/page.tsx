import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { FileText } from "lucide-react";

export default function Blog() {
  return (
    <div className="container mt-5">
      <div className="flex flex-col gap-6">
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl">
          Latest articles
        </h1>
        <EmptyPlaceholder>
          <FileText />
          No posts yet...
        </EmptyPlaceholder>
      </div>
    </div>
  );
}
