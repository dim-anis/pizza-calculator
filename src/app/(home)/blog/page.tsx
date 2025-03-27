import { EmptyPlaceholder } from "@/components/empty-placeholder";

export default function Blog() {
  return (
    <div className="container mx-auto mt-5 max-w-7xl">
      <div className="flex flex-col gap-6">
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl">
          Latest articles
        </h1>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
          <EmptyPlaceholder.Title>No blog posts yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Blog posts are yet to be added.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      </div>
    </div>
  );
}
