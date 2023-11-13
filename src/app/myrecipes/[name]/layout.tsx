import FolderList from "./folder-list";

export default function MyRecipesLayout({
  children,
}: {
  children: React.ReactNode;
  params: { name: string };
}) {
  return (
    <div className="container flex-1">
      <div className="mt-5 space-y-0.5 border-b pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          My recipes
        </h1>
        <p className="text-muted-foreground">
          Create recipes and organize them in folders.
        </p>
      </div>
      <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <FolderList />
        {children}
      </div>
    </div>
  );
}
