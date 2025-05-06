import { subtractExceptions } from "@/components/features/time-range-substract"
import { Button } from "@/components/ui/button"
import { RangeType, SubtractRangeType } from "@/types/time.type"
import { Minus, Plus } from "lucide-react"
import { useEffect, useState, useTransition } from "react"
import TimeRangeSelector from "./time-range-selector"

type Props = {
  selectTime: RangeType[]
  setSelectTime: (newTimes: SubtractRangeType[]) => void
  singleRangeData: RangeType[] | null
  isSingleDate: boolean
}

export const TimeRangeGroup = ({ selectTime, setSelectTime, singleRangeData, isSingleDate }: Props) => {
  const [available, setAvailable] = useState<RangeType[]>([])
  const [exception, setException] = useState<RangeType[]>([])
  const [isPending, startTransition] = useTransition();

  const addEmptyAvailableRange = () => {
    setAvailable((prev) => [...prev, ["", ""]])
  }

  const addEmptyException = () => {
    setException((prev) => [...prev, ["", ""]])
  }

  const handleRemoveException = (index: number) => {
    const newExp = exception.filter((_, i) => i !== index)
    startTransition(() => {
      setException(() => newExp)
    })
  }

  const handleRemoveAv = (index: number) => {
    const newAv = available.filter((_, i) => i !== index)
    startTransition(() => {
      setAvailable(() => newAv)
    })
  }

  const handleRangeGroup = (input: RangeType, selectType: string, index: number) => {
    if (selectType === "available") {
      setAvailable((prev) => {
        const updated = [...prev]
        updated[index] = [...input]
        return [...updated]
      })
    } else if (selectType === "exception") {
      setException((prev) => {
        const updated = [...prev]
        updated[index] = [...input]
        return [...updated]
      })
    }
  }

  useEffect(() => {
    if (!available.every(range => range[0] !== "" && range[1] !== "") ||
      !exception.every(range => range[0] !== "" && range[1] !== "")) return;

    const newSelectTime = subtractExceptions(available as SubtractRangeType[], exception as SubtractRangeType[])

    if (JSON.stringify(selectTime) !== JSON.stringify(newSelectTime)) {
      setSelectTime(newSelectTime);
    }
  }, [available, exception])


  useEffect(() => {
    if (isSingleDate && singleRangeData) {
      if (JSON.stringify(available) === JSON.stringify(singleRangeData)) return
      startTransition(() => {
        setAvailable(() => {
          return [...singleRangeData];
        })
      })
    }

    if (!isSingleDate && !singleRangeData) {
      startTransition(() => {
        setAvailable(() => [["", ""]])
      })
    }
  }, [isSingleDate, singleRangeData])


  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-4">
        <p className="flex justify-between font-semibold">
          Available time
          <Button type="button" variant={null} className="p-0 size-[20px]  bg-[#FFCE47]" onClick={addEmptyAvailableRange}><Plus /></Button>
        </p>
        {isPending ? null :
          <>
            {available.map((range, index) => (
              <li key={`${index}`} className="flex justify-between items-center">
                <TimeRangeSelector selectType={"available"} handleRangeGroup={handleRangeGroup} range={range} index={index} />
                {index !== 0 &&
                  <Button type="button" className="p-1 size-[20px]" onClick={() => handleRemoveAv(index)} ><Minus /></Button>
                }
              </li>
            ))}
          </>}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center font-semibold">
          <p>Add Exception</p>
          <Button type="button" variant={null} className="p-1 size-[20px] bg-[#FFCE47]" onClick={addEmptyException}><Plus /></Button>
        </div>

        <ul className="flex flex-col gap-2">
          {/* Cause flicking issue maybe need to use css to solve it */}
          {isPending ? null :
            <>
              {exception.map((range, index) => (
                <li key={`${index}`} className="flex justify-between items-center">
                  <TimeRangeSelector selectType={"exception"} handleRangeGroup={handleRangeGroup} range={range} index={index} />
                  <Button type="button" className="p-0 size-[20px]" onClick={() => handleRemoveException(index)} ><Minus /></Button>
                </li>
              ))}
            </>
          }
        </ul>
      </div>
    </div>
  )
}



