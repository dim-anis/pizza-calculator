import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainNav from "@/components/NavBar";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pizza Calculator",
  description:
    "Calculate baking ratios for pizza recipes. Share recipes online.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-background antialiased`}
      >
        <SessionProvider session={session}>
          <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
              <MainNav />
            </header>
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
