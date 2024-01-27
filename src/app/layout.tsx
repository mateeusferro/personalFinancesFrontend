import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Provider from "./provider"
import Link from "next/link"
import { getServerSession } from "next-auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Personal Finances",
  description: "This site will take care of your finances",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <nav>
            {!!session && "LOGOUT"}
            {!session && <Link href="/login">Login</Link>}
          </nav>
          {children}
        </body>
      </Provider>
    </html>
  )
}
