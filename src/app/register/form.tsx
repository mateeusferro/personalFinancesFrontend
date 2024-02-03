"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
            placeholder="Your name"
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <Input
            placeholder="Your email address"
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
            Register
          </Button>
        </form>
      </div>
    </div>
  )
}
