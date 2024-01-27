"use client"
import React, { useState } from "react"

export default function RegisterForm() {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    try {
      await fetch(process.env.NEXT_PUBLIC_API_URL + "user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      })
      setName("")
      setEmail("")
      setPassword("")
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className="flex flex-col gap-2 mx-auto max-w-md mt-10 text-black"
      onSubmit={handleSubmit}
    >
      <input
        className="border border-black"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        Register
      </button>
    </form>
  )
}
