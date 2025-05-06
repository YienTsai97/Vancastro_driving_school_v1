"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { TransactionType } from "@/types/transation.type"
import { useState } from "react"


export const AddPayment = () => {
  const [payment, setPayment] = useState<Partial<TransactionType>>({
    // id: number
    // invoiceId: number
    // invoice: InvoiceType[]
    amount: 0,
    issueDate: ""
  })

  const handleClearPayment = () => {
    setPayment({
      amount: 0,
      issueDate: ""
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPayment(prevState => ({
      ...prevState,
      [name]: value || "",
    }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(payment)
    handleClearPayment()
  }


  return (
    <Dialog>
      <DialogTrigger className="border-[1px] rounded-md p-2 hover:bg-slate-100 ">
        Add Payment
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="self-center">Add Payment</DialogTitle>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 p-3">
            <div className="flex flex-col">
              <label htmlFor="">Amount</label>
              <Input type="number" id="amount" name="amount" value={payment.amount} onChange={handleChange} placeholder="amount" />
            </div>
            <div className="flex flex-col pb-3">
              <label htmlFor="">Date</label>
              <Input type="date" id="issueDate" name="issueDate" value={payment.issueDate} onChange={handleChange} placeholder="Select Date" />
            </div>
            <Button type="submit" className="self-center">Submit</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog >

  )
}
