"use client"
import { Input } from "@/components/ui/input"
import { RangeType } from "@/types/time.type"
import { ChangeEvent, useEffect, useState } from "react"

type Props = {
  selectType: string
  handleRangeGroup: (input: RangeType, selectType: string, index: number) => void
  index: number
  range: RangeType | null
}


const TimeRangeSelector = ({ selectType, index, handleRangeGroup, range }: Props) => {
  const [timeRange, setTimeRange] = useState<RangeType>([
    range?.[0] ?? "",
    range?.[1] ?? ""
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    switch (name) {
      case "start":
        setTimeRange(([prevStart, prevEnd]) => [value, prevEnd || ""])
        break
      case "end": {
        setTimeRange(([prevStart, prevEnd]) => [prevStart || "", value])
        break
      }
    }
  }

  useEffect(() => {
    handleRangeGroup(timeRange, selectType, index)
  }, [timeRange])

  return (
    <div className="flex gap-2 justify-between items-center">
      <Input
        type="time"
        id="start"
        name="start"
        value={timeRange[0] || ""}
        onChange={handleChange}
        className="w-[110px] sm:w-full text-[12px]"
        placeholder="Select Start Time"
        required />
      <p>to</p>
      <Input
        type="time"
        id="end"
        name="end"
        value={timeRange[1] || ""}
        onChange={handleChange}
        className="w-[110px] sm:w-full text-[12px]"
        placeholder="Select End Date"
        required />
    </div>
  )
}

export default TimeRangeSelector