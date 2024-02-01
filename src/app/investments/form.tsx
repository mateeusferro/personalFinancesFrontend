"use cliente"

import { backend } from "@/services/backend"
import { AxiosResponse } from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function InvestmentsForm() {
  const { data: session } = useSession()
  const [description, setDescription] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [date, setDate] = useState<Date>()
  const [value, setValue] = useState<number>(0)
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
        type: type,
        description: description,
        value: value,
        date: date?.toISOString().split("T")[0],
        usersId: session?.user.id,
        currencyId: currencies[0].id,
      }
      await backend.post("investments/create", payload)
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
        placeholder="Type of investment"
        value={type}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setType(e.target.value)
        }
      />
      <input
        className="border border-black"
        type="text"
        placeholder="Description of investment"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
      />
      <input
        className="border border-black"
        type="number"
        placeholder="Value of investment"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(Number(e.target.value))
        }
      />
      <input
        className="border border-black"
        type="date"
        placeholder="Date of investment"
        value={date ? date.toISOString().split("T")[0] : ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDate(new Date(e.target.value))
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