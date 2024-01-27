'use client';
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function RegisterForm() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    })
    setEmail("")
    setPassword("")
    if(!res?.error){
      router.push("/")
      router.refresh()
    }
  }

  return (
    <form
      className="flex flex-col gap-2 mx-auto max-w-md mt-10 text-black"
      onSubmit={handleSubmit}
    >
      <input
        className="border border-black"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border border-black"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-[#ffff]"
        disabled={loading === true ? true : false}
      >
        Login
      </button>
    </form>
  )
}
