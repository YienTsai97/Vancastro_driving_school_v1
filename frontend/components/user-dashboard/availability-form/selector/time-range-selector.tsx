"use client"
import { QUARTER_HOUR_TIMES } from "@/components/features/time-range-calculator"
import { RangeType } from "@/types/time.type"
import { ChangeEvent, useEffect, useState } from "react"

type Props = {
  selectType: string
  handleRangeGroup: (input: RangeType, selectType: string, index: number) => void
  index: number
  range: RangeType | null
}

function timeOptions(current: string) {
  if (current && !QUARTER_HOUR_TIMES.includes(current)) {
    return [current, ...QUARTER_HOUR_TIMES]
  }
  return QUARTER_HOUR_TIMES
}

const selectClassName =
  "h-9 w-[110px] sm:w-full rounded-md border border-input bg-transparent px-2 text-[12px] shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"

const TimeRangeSelector = ({ selectType, index, handleRangeGroup, range }: Props) => {
  const [timeRange, setTimeRange] = useState<RangeType>([
    range?.[0] ?? "",
    range?.[1] ?? ""
  ]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    switch (name) {
      case "start":
        setTimeRange(([, prevEnd]) => [value, prevEnd || ""])
        break
      case "end": {
        setTimeRange(([prevStart]) => [prevStart || "", value])
        break
      }
    }
  }

  useEffect(() => {
    handleRangeGroup(timeRange, selectType, index)
  }, [handleRangeGroup, index, selectType, timeRange])

  return (
    <div className="flex gap-2 justify-between items-center">
      <select
        id={`${selectType}-${index}-start`}
        name="start"
        value={timeRange[0] || ""}
        onChange={handleChange}
        className={selectClassName}
        required
      >
        <option value="">Start</option>
        {timeOptions(timeRange[0] || "").map((time) => (
          <option key={`start-${time}`} value={time}>
            {time}
          </option>
        ))}
      </select>
      <p>to</p>
      <select
        id={`${selectType}-${index}-end`}
        name="end"
        value={timeRange[1] || ""}
        onChange={handleChange}
        className={selectClassName}
        required
      >
        <option value="">End</option>
        {timeOptions(timeRange[1] || "").map((time) => (
          <option key={`end-${time}`} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TimeRangeSelector
