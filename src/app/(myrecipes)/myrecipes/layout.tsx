import NavBar from "@/components/nav-menu";
import FolderList from "./[folder]/_components/folder-list";
import UserDropdown from "@/components/user-dropdown";

export default function MyRecipesLayout({
  children,
}: {
  children: React.ReactNode;
  params: { name: string };
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <NavBar>
            <FolderList />
          </NavBar>
          <UserDropdown />
        </div>
      </header>
      <div className="container flex-1">
        <div className="mt-5 space-y-0.5 border-b pb-5">
          <h1 className="text-2xl font-bold tracking-tight">My recipes</h1>
          <p className="text-muted-foreground">
            Create recipes and organize them in folders.
          </p>
        </div>
        <div className="md:grid md:grid-cols-[220px_1fr] md:gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
          <aside className="hidden w-full flex-col space-y-4 overflow-y-auto py-6 md:flex lg:py-10">
            <FolderList />
          </aside>
          <div className="space-y-2 py-6 md:space-y-4 lg:gap-10 lg:py-10">
            <main className="flex w-full flex-1 flex-col gap-4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
