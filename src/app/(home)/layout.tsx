import Footer from "@/components/Footer";
import MainNav from "@/components/NavBar";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <MainNav />
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
