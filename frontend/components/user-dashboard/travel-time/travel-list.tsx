"use client"
import { formatLocation, getLocationKey } from "@/components/features/travel-time"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useIsMobile } from "@/hooks/use-mobile"
import plus from "@/public/assets/dashboard/plus.svg"
import { TravelTimeRequestData, TravelTimeType } from "@/types/travelTime.type"
import { createTravelTime, deleteTravelTime, updateTravelTime } from "@/utils/travelTimeFetch"
import { MoveHorizontal, Pencil, Save, Trash2, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
  rawData: TravelTimeType[]
}

export default function TravelList({ rawData }: Props) {
  const isMobile = useIsMobile()
  const [travelTimeData, setTravelTimeData] = useState<TravelTimeType[]>([])
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [isSelectedFromList, setIsSelectedFromList] = useState<boolean>(false)
  const [activeTime, setActiveTime] = useState<string | null>(null);
  const [openingItem, setOpeningItem] = useState<string | null>(null);
  const [from, setFrom] = useState<string>("")
  const [to, setTo] = useState<string>("")
  const [min, setMin] = useState<number>(0)
  const handleClear = () => {
    setFrom(() => "")
    setTo(() => "")
    setMin(() => 0)
  }

  // Remove Duplicate Data - trigger only once
  useEffect(() => {
    const seen = new Set()
    const filteredTravelTimeData: TravelTimeType[] = []
    rawData?.filter(item => {
      const key = getLocationKey(item)
      if (!seen.has(key)) {
        seen.add(key)
        filteredTravelTimeData.push(item)
      }
    })
    setTravelTimeData(() => filteredTravelTimeData)
  }, [])

  //Submit create to travel (from-to & to-from)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (from === "" || to === "" || min === 0) {
      alert("please fill up the blank")
      return
    }
    const upperFrom: string = formatLocation(from).join(" ");
    const upperTo: string = formatLocation(to).join(" ");
    const newData: TravelTimeRequestData = {
      location1: upperFrom,
      location2: upperTo,
      durationMinutes: min
    }
    const responseData = await createTravelTime(newData)
    console.log("responseData", responseData)
    if (responseData) {
      setTravelTimeData((prev: TravelTimeType[]) => {
        const exists = prev.find(item => getLocationKey(item) === getLocationKey(newData))
        return exists ? prev : [...prev, {
          ...newData,
          id: Number(responseData?.data?.id ?? 0),
          createdAt: new Date(responseData?.data?.createdAt ?? ""),
          updatedAt: new Date(responseData?.data?.updatedAt ?? "")
        }]
      })
      console.log("success Create 1st travelTime", responseData)
    } else {
      console.error("Failed to Create 1st travelTime");
    }
  }
  //Update New Datas (from-to & to-from)
  const handleUpdate = async () => {
    if (min === 0) {
      alert("please fill up the blank")
      return
    }
    //get two travelTime's Id from raw-data
    const selectedDatas: TravelTimeType[] = []
    const upperFrom: string = formatLocation(from).join("");
    const upperTo: string = formatLocation(to).join("");
    rawData.filter((item) => {
      const itemKey = getLocationKey(item).replace(/\s+/g, "");
      console.log("itemKey", itemKey)
      console.log("from-to", `${upperFrom}-${upperTo}`)
      console.log("to-from", `${upperTo}-${upperFrom}`)
      if (itemKey === `${upperFrom}-${upperTo}` || itemKey === `${upperTo}-${upperFrom}`) {
        selectedDatas.push(item)
      }
    })
    //Update two data
    for (const item of selectedDatas) {
      const updatedData = {
        location1: item.location1,
        location2: item.location2,
        durationMinutes: min
      }
      const responseData = await updateTravelTime(item.id, updatedData);
      if (responseData) {
        setTravelTimeData((prev: TravelTimeType[]) =>
          prev.map((prevItem) => prevItem.id === item.id ?
            {
              ...prevItem,
              durationMinutes: min,
              updatedAt: new Date(responseData.data?.updatedAt ?? "")
            }
            :
            prevItem
          )
        )
        console.log("success Update Two TravelTimes", responseData);
      } else {
        console.error("Failed to Update Two TravelTimes");
      }
    }
  }

  //Delete selected Traveltime Data
  const handleDelete = async () => {
    const upperFrom: string = formatLocation(from).join("");
    const upperTo: string = formatLocation(to).join("");
    //get two travelTime's Id from raw-data
    const selectedDatas: TravelTimeType[] = []
    rawData.filter((item) => {
      const itemKey = getLocationKey(item).replace(/\s+/g, "");
      console.log("itemKey", itemKey)
      console.log("from-to", `${upperFrom}-${upperTo}`)
      console.log("to-from", `${upperTo}-${upperFrom}`)
      if (itemKey === `${upperFrom}-${upperTo}` || itemKey === `${upperTo}-${upperFrom}`) {
        selectedDatas.push(item)
      }
    })
    //Update two data
    for (const item of selectedDatas) {
      const response = await deleteTravelTime(item.id);
      if (response) {
        setTravelTimeData((prev: TravelTimeType[]) =>
          prev.filter((prevItem) => prevItem.id !== item.id))
        console.log("success Update Two TravelTimes", response);
      } else {
        console.error("Failed to Update Two TravelTimes");
      }
    }
  }

  return (
    <>
      <ul className="px-6">
        {travelTimeData?.map((item) => (
          <li
            key={getLocationKey(item)}
            onClick={isMobile ? () => {
              setActiveTime(() => getLocationKey(item))
            } : undefined}
            onMouseEnter={() => {
              setActiveTime(() => getLocationKey(item))
            }}
            className="flex flex-col md:flex-row justify-between border-b-[1px] py-3 gap-3 text-[14px] min-[360px]:text-[16px] sm:text-[20px] "
          >
            <div className="flex gap-3 items-center">
              <h3 className="  text-left font-medium">
                {item.location1}
              </h3>
              <MoveHorizontal />
              <h3 className="  text-left font-medium">
                {item.location2}
              </h3>
            </div>
            <div className="flex items-center gap-2 justify-end">
              {isSelectedFromList && openingItem === getLocationKey(item) ?
                <>
                  <input
                    type="number"
                    id="min"
                    name="min"
                    value={min}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMin(Number(e.target.value))}
                    className="w-[40px] text-right font-medium text-[#777777]"
                    required
                  />
                  <h3>Min</h3>
                  <div className="flex gap-3 pl-2">
                    <Button
                      type="button"
                      variant={null}
                      className="px-3 bg-[#FFCE47] text-w "
                      onClick={async () => {
                        await handleUpdate()
                        handleClear()
                        setIsSelectedFromList(() => false)
                      }}
                    >
                      <Save />
                    </Button>
                    <Dialog>
                      <DialogTrigger className="px-3 mr-1 bg-[#EB5757] rounded-md">
                        <Trash2 className="size-[18px]" />
                      </DialogTrigger>
                      <DialogContent className="flex flex-col gap-6">
                        <DialogHeader className="flex flex-col gap-4">
                          <DialogTitle>Delete Travel Time?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone and could impact the travel distance calculation when students book their lessons.
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
                              onClick={async () => handleDelete()}>
                              Delete
                            </Button>
                          </div>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      type="button"
                      variant={null}
                      className="px-2"
                      onClick={() => {
                        handleClear()
                        setIsSelectedFromList(() => false)
                        setOpeningItem(() => "")
                      }}
                    >
                      <X className="self-center" />
                    </Button>
                  </div>
                </>
                :
                <>
                  <h3 className=" text-left font-medium">
                    {item.durationMinutes}
                  </h3>
                  <h3>Min</h3>
                  {activeTime === getLocationKey(item) &&
                    <Button
                      variant={"link"}
                      type="button"
                      onClick={
                        () => {
                          setIsAdding(() => false)
                          handleClear()
                          setFrom(() => item.location1)
                          setTo(() => item.location2)
                          setMin(() => item.durationMinutes)
                          setIsSelectedFromList(() => true)
                          setOpeningItem(() => activeTime)
                        }
                      }
                      className="p-0 m-0 h-fit w-[30px] self-center text-[#777777] hover:text-black active:text-black"
                    >
                      {isSelectedFromList && openingItem === getLocationKey(item) ? null : <Pencil className="self-center" />}
                    </Button>
                  }
                </>
              }
            </div>
          </li>
        ))}
      </ul >
      {isAdding &&
        <form className=" w-full flex flex-col md:flex-row justify-between gap-3 py-3 px-6 text-[14px] min-[360px]:text-[16px] sm:text-[20px]">
          <div className="w-full flex gap-3 items-center">
            <input
              type="text"
              id="from"
              name="from"
              value={from}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFrom(e.target.value)}
              placeholder="From"
              className="w-[40%] p-0 text-left font-medium focus:outline-none"
              required={isAdding ? true : false}
            />
            <MoveHorizontal />
            <input
              type="text"
              id="to"
              name="to"
              value={to}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTo(e.target.value)}
              placeholder="To"
              className="w-[40%] text-left font-medium focus:outline-none"
              required={isAdding ? true : false}
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <input
              type="number"
              id="min"
              name="min"
              value={min}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMin(Number(e.target.value))}
              className="w-[40px] text-right font-medium focus:outline-none"
              required={isAdding ? true : false}
            />
            <h3>Min</h3>
            <div className="flex gap-3 ml-2">
              <Button
                type="submit"
                variant={null}
                className="px-3 bg-[#FFCE47] text-w "
                onClick={async (e) => {
                  await handleSubmit(e)
                  handleClear()
                  setIsAdding(() => false)
                }}
              >
                <Save />
              </Button>
              <Button
                type="button"
                variant={null}
                className="px-2"
                onClick={() => {
                  setIsAdding(() => false)
                  handleClear()
                }}
              >
                <X className="self-center" />
              </Button>
            </div>
          </div>
        </form>
      }

      {!isAdding &&
        <Button
          variant={null}
          type="button"
          onClick={() => {
            handleClear()
            setActiveTime(() => "")
            setIsSelectedFromList(() => false)
            setIsAdding(() => true)
          }}
          className="fixed right-7 bottom-7 size-14 rounded-full bg-[#FFCE47] z-10 shadow-md">
          <Image src={plus} alt="add TravelTime" height={22} width={22} />
        </Button>
      }
    </>
  )
}