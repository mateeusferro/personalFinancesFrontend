"use client"
import { backend } from "@/services/backend"
import { AxiosResponse } from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function ExpensesForm() {
  const { data: session } = useSession()
  const [type, setType] = useState<string>("")
  const [paymentType, setPaymentType] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [date, setDate] = useState<Date>()
  const [paidDate, setPaidDate] = useState<Date>()
  const [value, setValue] = useState<number>(0)
  const [paid, setPaid] = useState<number>(0)
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
        usersId: session?.user.id,
        date: date?.toISOString().split("T")[0],
        paidDate: paidDate?.toISOString().split("T")[0],
        type: type,
        paymentType: paymentType,
        paid: paid,
        value: value,
        description: description,
        currencyId: currencies[0].id,
      }
      await backend.post("expenses/create", payload)
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
        placeholder="Type of expense"
        value={type}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setType(e.target.value)
        }
      />
      <input
        className="border border-black"
        type="number"
        placeholder="Value of expense"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(Number(e.target.value))
        }
      />
      <input
        className="border border-black"
        type="number"
        placeholder="Value paid of expense"
        value={paid}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPaid(Number(e.target.value))
        }
      />
      <input
        className="border border-black"
        type="text"
        placeholder="Payment type of expense"
        value={paymentType}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPaymentType(e.target.value)
        }
      />
      <input
        className="border border-black"
        type="text"
        placeholder="Description of expense"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
      />
      <input
        className="border border-black"
        type="date"
        placeholder="Date of expense"
        value={date ? date.toISOString().split("T")[0] : ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDate(new Date(e.target.value))
        }
      />
      <input
        className="border border-black"
        type="date"
        placeholder="Paid date of expense"
        value={paidDate ? paidDate.toISOString().split("T")[0] : ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPaidDate(new Date(e.target.value))
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
