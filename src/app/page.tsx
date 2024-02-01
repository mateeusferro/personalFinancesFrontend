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
          <Link href="/login">Login</Link>
          <Link href="/register">REGISTER</Link>
        </>
      )}
    </main>
  )
}
