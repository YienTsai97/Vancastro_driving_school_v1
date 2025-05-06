"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { CircleX } from 'lucide-react';



export const DeletePayment = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <CircleX className="size-[15px]" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="self-center">Comfirmation</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will delete your payment and void this receipt.
          </DialogDescription>
          <div className="flex gap-3 self-center">
            <Button type="button" variant="destructive" className="self-center">Delete</Button>
            <Button type="button" variant="outline" className="self-center">Cancel</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog >

  )
}


