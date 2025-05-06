"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Replace with the correct path to your Input component
import { CopyPlus, CopyX } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  selectedDays: (number | null)[]
  handleSelectedDay: (newDays: (number | null)[]) => void
}


const DayRangeSelector = ({ selectedDays, handleSelectedDay }: Props) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
  const daysShortHand = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    const newArray = checked ?
      [...selectedDays, Number(value)] : selectedDays.filter((day) => day !== Number(value))
    handleSelectedDay(newArray.sort())
  }

  const selectWeekdays = () => {
    handleSelectedDay([1, 2, 3, 4, 5])
  }

  const selectAlldays = () => {
    handleSelectedDay([0, 1, 2, 3, 4, 5, 6])
  }

  const emptyAllCheckBox = () => {
    handleSelectedDay([])
  }

  useEffect(() => {
    if (selectedDays.length === 0) return setIsSelected(() => false)
    if (selectedDays.length !== 0) return setIsSelected(() => true)
  }, [selectedDays])

  return (
    <div className="flex flex-col day-checkbox  gap-4">
      <div className="flex justify-between items-center">
        <p className="text-[16px] font-semibold">Working Day</p>
        <div className="flex items-center gap-2">
          <Button type="button" variant={"outline"} onClick={selectWeekdays} className=" w-fit h-fit p-2">Weekdays</Button>
          {isSelected ?
            <Button type="button" variant={"outline"} onClick={emptyAllCheckBox} className="p-2"><CopyX /></Button>
            :
            <Button type="button" variant={null} onClick={selectAlldays} className="p-2 bg-[#FFCE47]"><CopyPlus /></Button>
          }
        </div>
      </div>
      <ul className="flex justify-between sm:gap-3 ">
        {days.map((day, index) => (
          <label
            key={index}
            htmlFor={day}
            className={`
              ${selectedDays.includes(index) && "bg-[#FFCE47]"}
              " border-gray-200 border-[1px] rounded-md shadow-sm shadow-gray size-[38px] sm:size-full sm:h-9 flex items-center"
              `}
          >
            <Input
              type="checkbox"
              id={day}
              name={day}
              value={index}
              onChange={handleChecked}
              checked={selectedDays.includes(index)}
              style={{ display: "none" }}
            />
            <p className=" m-auto text-[14px]">
              {daysShortHand[index]}
            </p>
          </label>
        ))}
      </ul>
    </div >
  )
}

export default DayRangeSelector
