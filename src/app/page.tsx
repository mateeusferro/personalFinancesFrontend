"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect } from "react"

export default function Home() {
  const { data: session } = useSession()
  useEffect(() => {
    console.log(session && session?.user)
  })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-32">
      <Link href="/register">REGISTER</Link>
    </main>
  )
}
