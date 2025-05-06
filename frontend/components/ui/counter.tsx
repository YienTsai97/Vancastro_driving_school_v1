"use client"
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

type Props = {
  amount: number
  handleAmount: (amount: number) => void
}

export default function Counter({ amount, handleAmount }: Props) {

  const increment = () => {
    handleAmount(amount + 1);
  }

  const decrement = () => {
    if (amount > 0) {
      handleAmount(amount - 1);
    }
  }

  return (
    <div
      className='w-fit flex gap-3 items-center overflow-hidden rounded-full border-[1px] border-black
    '>
      <Button
        type="button"
        onClick={decrement}
        className='rounded-none px-3'
      >
        <Minus />
      </Button>
      <p className='w-2 text-center'>{amount}</p>
      <Button
        type="button"
        onClick={increment}
        className='rounded-none px-3'
      >
        <Plus />
      </Button>
    </div>
  );

}