import Footer from "@/components/footer";
import NavBar from "@/components/nav-menu";
import UserDropdown from "@/components/user-dropdown";
import { homeConfig } from "@/config/home";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <NavBar items={homeConfig.mainNav} />
          <UserDropdown />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
