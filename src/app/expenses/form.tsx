"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { backend } from "@/services/backend"
import { AxiosResponse } from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
  const [selectedCurrency, setSelectedCurrency] = useState<any>(null)
  const [open, setOpen] = useState(false)
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
    <div className="flex justify-center items-center h-screen">
      <div
        className="bg-white p-8 rounded-lg shadow-2xl "
        style={{ width: "500px", height: "500px" }}
      >
        <form
          className="flex flex-col gap-2 mx-auto max-w-md mt-10 text-black"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            placeholder="Type of expense"
            value={type}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setType(e.target.value)
            }
          />
          <Input
            type="number"
            placeholder="Value of expense"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="Value paid of expense"
            value={paid}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPaid(Number(e.target.value))
            }
          />
          <Input
            type="text"
            placeholder="Payment type of expense"
            value={paymentType}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPaymentType(e.target.value)
            }
          />
          <Input
            type="text"
            placeholder="Description of expense"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />
          <Input
            type="date"
            placeholder="Date of expense"
            value={date ? date.toISOString().split("T")[0] : ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDate(new Date(e.target.value))
            }
          />
          <Input
            type="date"
            placeholder="Paid date of expense"
            value={paidDate ? paidDate.toISOString().split("T")[0] : ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPaidDate(new Date(e.target.value))
            }
          />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {selectedCurrency
                  ? selectedCurrency.name
                  : "Select currency..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 max-h-48 overflow-y-auto">
              <Command>
                <CommandInput placeholder="Search currency..." />
                <CommandEmpty>No currency found.</CommandEmpty>
                <CommandGroup>
                  {currencies.map((currency: any) => (
                    <CommandItem
                      key={currency.id}
                      value={currency}
                      onSelect={(currentCurrency: any) => {
                        setSelectedCurrency(
                          currentCurrency === selectedCurrency
                            ? null
                            : {
                                id: currency.id,
                                abbreviations: currency.abbreviations,
                                symbol: currency.symbol,
                                name: currency.name,
                              }
                        )
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedCurrency?.id === currency.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {currency.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Button
            className="mt-5"
            type="submit"
            disabled={loading === true ? true : false}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  )
}
