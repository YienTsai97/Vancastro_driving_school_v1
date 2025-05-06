"use client"

import { formattoLocalDate } from "@/components/features/date-input-select-check"
import { Input } from "@/components/ui/input"
import { RangeType } from "@/types/time.type"
import { ChangeEvent, useEffect } from "react"

type Props = {
  range: RangeType | [null]
  handleDateRange: (startDate: string, endDate: string) => void
  isSingleDate: boolean
}

const DateRangeSelector = ({ range, handleDateRange, isSingleDate }: Props) => {


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (isSingleDate) {
      handleDateRange(value, value)
      return
    }

    switch (name) {
      case "start":
        handleDateRange(value, range[1] ? range[1] : "")
        break
      case "end": {
        handleDateRange(range[0] ? range[0] : "", value)
        break
      }
    }
  }

  useEffect(() => {
    if (isSingleDate) {
      if (!range[0]) return
      handleDateRange(range[0], range[0])
    } else {
      handleDateRange(range[0] || "", "")
    }
  }, [isSingleDate])

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        {!isSingleDate &&
          <p className="font-semibold">From</p>}
        <Input
          type="date"
          id="start"
          name="start"
          min={formattoLocalDate(new Date())}
          max={isSingleDate ? "" : range[1] || undefined}
          value={range[0] || ""}
          onChange={handleChange}
          className="w-[160px] text-[14px]"
          placeholder="Select Start Time"
          required />
      </div>
      {isSingleDate ? null :
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <p className="font-semibold">To</p>
          <Input
            type="date"
            id="end"
            name="end"
            min={range[0] || undefined}
            value={isSingleDate ? range[0] || "" : range[1] || ""}
            onChange={handleChange}
            className="w-[160px] text-[14px]"
            placeholder="Select End Date"
            required />
        </div>}
    </div>
  )
}

export default DateRangeSelector