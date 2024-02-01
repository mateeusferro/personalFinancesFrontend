"use client"
import { backend } from "@/services/backend"
import { useEffect, useState } from "react"
import { AxiosResponse } from "axios"
import { useSession } from "next-auth/react"

export default function BankAccountForm() {
  const { data: session } = useSession()
  const [name, setName] = useState<string>("")
  const [balance, setBalance] = useState<number>()
  const [loading, setLoading] = useState<boolean>(false)
  const [currencies, setCurrencies] = useState<any>([])

  async function fetchCurrency(): Promise<AxiosResponse<any, any> | undefined> {
    try {
      const res: AxiosResponse<any> = await backend.get("currency")
      setCurrencies(res.data.data)
      return res
    } catch (e) {
      console.error(e)
      return undefined
    }
  }

  useEffect(() => {
    fetchCurrency()
      .then((result) => {})
      .catch((error) => {})
    // eslint-disable-next-line
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    try {
      const payload = {
        name: name,
        balance: balance,
        usersId: session?.user.id,
        currencyId: currencies[0].id
      }
      await backend.post("bankAccount/create", payload)
      setName("")
      setBalance(0)
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
        placeholder="Name of bank"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <input
        className="border border-black"
        type="number"
        placeholder="Balance of bank"
        value={balance}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBalance(Number(e.target.value))
        }
      />
      <button
        type="submit"
        className="bg-[#ffff]"
        disabled={loading === true ? true : false}
      >
        Create
      </button>
    </form>
  )
}
