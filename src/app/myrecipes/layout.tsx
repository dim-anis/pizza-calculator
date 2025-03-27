import NavBar from "@/components/nav-menu";
import FolderList from "./[folderName]/_components/folder-list";
import UserDropdown from "@/components/user-dropdown";
import { homeConfig } from "@/config/home";

type Params = {
  children: React.ReactNode;
};

export default async function MyRecipesLayout({ children }: Params) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container max-w-[1400px] mx-auto z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <NavBar items={homeConfig.mainNav}>
            <FolderList />
          </NavBar>
          <UserDropdown />
        </div>
      </header>
      <div className="container mx-auto flex-1 max-w-7xl">
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
