
"use client"
import { convertToUTC } from "@/components/features/availability-utc-local-converter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { AvailabilityType, RangeType, SubtractRangeType, utcAvailabilityType } from "@/types/time.type";
import { updateUser } from "@/utils/userFetch";
import { Pencil, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { TimeRangeGroup } from "./selector/time-range-group";

type Props = {
  instructorId: number | null
  availability: AvailabilityType
  setAvailability: Dispatch<SetStateAction<AvailabilityType>>
  handleDateRange: (startDate: string, endDate: string) => void
  isSelectedFromList: boolean
  handleSelectedFromList: (state: boolean) => void
  selectTime: RangeType[]
  setSelectTime: (newTimes: SubtractRangeType[]) => void
  singleRangeData: RangeType[] | null
  isSingleDate: boolean
  handleSubmit: (e: React.FormEvent) => Promise<void>
}

export default function AvailabilityList({ instructorId, availability, setAvailability, handleDateRange, isSelectedFromList, handleSelectedFromList, selectTime, setSelectTime, singleRangeData, isSingleDate, handleSubmit }: Props) {
  const isMobile = useIsMobile()
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [openingItem, setOpeningItem] = useState<string | null>(null);
  const deleteDateData = async (selectDate: string) => {
    if (!instructorId) return
    const newData = Object.fromEntries(Object.entries(availability).filter(([date]) => date !== selectDate));
    setAvailability(() => newData);
    const utcAvailability: utcAvailabilityType = convertToUTC(newData, "local");
    //Update User Availability to DB
    const response = await updateUser({
      id: instructorId,
      availability: utcAvailability as unknown as JSON
    })
    if (response) {
      console.log("success Update Availability", response)
      window.location.href = '/instructor/availability'
    } else {
      console.error("Failed to update availability");
    }
  }

  return (
    <>
      {
        Object.entries(availability).map(([date, timeslot]) => (
          <div
            key={date}
            className="border-b-[1px] px-0 py-3 m-0 w-full flex flex-col gap-3"
            onClick={isMobile ? () => {
              setActiveDate(() => date)
            } : undefined}
            onMouseEnter={() => {
              setActiveDate(() => date)
            }}
          >
            <div className="flex  justify-between">
              <div className="flex gap-2">
                <h3 className="w-[75px] text-[20px] text-left font-medium">
                  {new Date(date + "T00:00:00").toLocaleDateString("en-CA", { month: "short" })}
                  {" "}
                  {new Date(date + "T00:00:00").getDate()}
                </h3>
                {(!isSelectedFromList || openingItem !== date) &&
                  <ul className="flex flex-col min-[360px]:flex-row flex-wrap items-center justify-center gap-3">
                    {timeslot.map((slot, index) => (
                      <li key={index} className="text-[12px] sm:text-[14px] text-[#777777]">
                        {slot[0]} - {slot[1]}
                      </li>
                    ))}
                  </ul>
                }
              </div>
              {activeDate === date &&
                <Button
                  variant={"link"}
                  type="button"
                  onClick={
                    () => {
                      if (activeDate !== openingItem) {
                        handleSelectedFromList(true)
                      }
                      else {
                        handleSelectedFromList(!isSelectedFromList)
                      }
                      setOpeningItem(activeDate)
                      handleDateRange(activeDate, activeDate)
                    }
                  }
                  className="p-0 m-0 h-fit w-[30px] self-center text-[#777777] hover:text-black active:text-black"
                >
                  {isSelectedFromList && openingItem === date ? <X className="self-center" /> : <Pencil className="self-center" />}
                </Button>
              }
            </div>
            {(isSelectedFromList && openingItem === date) &&
              <div className="pr-2 sm:w-[350px]">
                <TimeRangeGroup selectTime={selectTime} setSelectTime={setSelectTime} singleRangeData={singleRangeData} isSingleDate={isSingleDate} />
                <div className="w-full flex gap-2 md:justify-start pt-4">
                  <Dialog>
                    <DialogTrigger className="w-full sm:w-fit bg-[#EB5757] font-semibold text-sm rounded-md py-2 px-4 text-white">
                      Delete
                    </DialogTrigger>
                    <DialogContent className="flex flex-col gap-6">
                      <DialogHeader className="flex flex-col gap-4">
                        <DialogTitle>Delete availability?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <div className="flex gap-2">
                          <DialogClose className="w-full" asChild>
                            <Button
                              variant={"outline"}
                              className="w-full border-[#2F2F2F]"
                            >
                              Cancel
                            </Button>
                          </DialogClose >
                          <Button
                            variant={"default"}
                            type="button"
                            className="w-full sm:w-fit  font-semibold  bg-[#EB5757]"
                            onClick={() => deleteDateData(date)}>
                            Delete
                          </Button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant={null}
                    type="submit"
                    className="bg-[#FFCE47] w-full sm:w-fit font-semibold"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </div>
              </div>
            }
          </div>
        ))
      }
    </ >
  )
}
