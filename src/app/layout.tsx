import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pizza Calculator',
  description: 'Calculate baking ratios for pizza recipes. Share recipes online.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-7xl w-[min(100% - 3rem, 65ch)] mx-auto`}>
        <nav className="flex flex-row justify-between p-8 py-6">
          <h1 className="tracking-tighter text-2xl">Pizza Calculator</h1>
          <Navbar />
        </nav>
        {children}
      </body>
    </html>
  )
}
