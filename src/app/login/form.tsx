"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function LoginForm() {
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
    if (!res?.error) {
      router.push("/")
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="bg-white p-8 rounded-lg shadow-2xl "
        style={{ width: "500px", height: "300px" }}
      >
        <form
          className="flex flex-col gap-2 mx-auto max-w-md mt-10 text-black"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="Your email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Input
            placeholder="Your password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Button
            className="mt-5"
            type="submit"
            disabled={loading === true ? true : false}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
