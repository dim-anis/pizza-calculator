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
      <body>
        <div className={`${inter.className} w-[min(100%-3rem,_75ch)] mx-auto`}>
          <nav className="flex flex-row justify-between py-6">
            <h1 className="tracking-tighter text-2xl">Pizza Calculator</h1>
            <Navbar />
          </nav>
          {children}
        </div>
      </body>
    </html>
  )
}
