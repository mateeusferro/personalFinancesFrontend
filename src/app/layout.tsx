import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Provider from "./provider"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Personal Finances",
  description: "This site will take care of your finances",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          {children}
        </body>
      </Provider>
    </html>
  )
}
