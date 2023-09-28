import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
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
        className={`${inter.className} antialiased text-slate-500 bg-white`}
      >
        <SessionProvider session={session}>
          <main className={`w-[min(100%-3rem,_90ch)] mx-auto`}>
            <NavBar />
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
