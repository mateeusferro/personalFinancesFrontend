"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import logout from "./api/logout/logout"
import { useEffect } from "react"

export default function Home() {
  const { data: session } = useSession()

  async function handleLogout() {
    await logout(session?.user.token)
    signOut()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-32">
      {session?.user && <span onClick={() => handleLogout()}>Logout</span>}
      {!session?.user && (
        <>
          <Link
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            href="/register"
          >
            Register
          </Link>
        </>
      )}
    </main>
  )
}
