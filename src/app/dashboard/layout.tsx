import NavBar from "@/components/nav-menu";
import UserDropdown from "@/components/user-dropdown";
import { homeConfig } from "@/config/home";
import SideBar from "./_components/sidebar";

type Params = {
  children: React.ReactNode;
};

export default async function MyRecipesLayout({ children }: Params) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container max-w-[1400px] mx-auto z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <NavBar items={homeConfig.mainNav}>
            <SideBar />
          </NavBar>
          <UserDropdown />
        </div>
      </header>
      <div className="container mx-auto flex-1 max-w-7xl">
        <div className="md:grid md:grid-cols-[220px_1fr] md:gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
          <aside className="hidden w-full flex-col space-y-4 overflow-y-auto py-6 md:flex lg:py-10">
            <SideBar />
          </aside>
          <div className="space-y-2 py-6 md:space-y-4 lg:gap-10 lg:py-10">
            <main className="flex w-full h-full flex-1 flex-col gap-4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
