import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple todo With Typescript',
  description: 'Typescript Redux toolkit to implement some resusable confirmation and modal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
