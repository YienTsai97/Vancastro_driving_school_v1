"use client"
import { LessonEventType } from "@/types/lesson.type";
import { useEffect, useRef, useState } from "react";
import { formattoLocalDate, getDates, twoMonthsLater } from "../features/date-input-select-check";
import { Button } from "../ui/button";
import { Carousel, CarouselContent } from "../ui/carousel";

type Props = {
  selectDate: string
  handleSelectDate: (data: Date) => void
  events: LessonEventType[]
}

export default function CalendarDateSelector({ selectDate, handleSelectDate, events }: Props) {
  //get twoDaysLater and twoMonthLater from today
  const today = new Date();
  const endDate: Date = twoMonthsLater(today)

  // Opening Date Group 
  const openDateRange: Date[] = getDates(today, endDate)
  // Visible Opening Date Range
  const [visibleRange, setVisibleRange] = useState({ from: "", to: "" })
  const prevVisibleRange = useRef({ from: "", to: "" })
  // All Date Btn Ref
  const dateRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const visiblePart = new Set<string>()
    //Get all Visible Date: using IntersectionObserver
    const callbackEntries = (entries: IntersectionObserverEntry[]) => {
      let isUpdated = false
      entries.forEach((entry) => {
        const date = entry.target.getAttribute("data-date")
        if (!date) return

        if (entry.isIntersecting) {
          if (!visiblePart.has(date)) {
            visiblePart.add(date)
            isUpdated = true
          }
        } else {
          if (visiblePart.has(date)) {
            visiblePart.delete(date)
            isUpdated = true
          }
        }
      })
      if (isUpdated) {
        const sortVisiblePart = Array.from(visiblePart).sort()
        if (sortVisiblePart.length >= 2) {
          const newRange = {
            from: sortVisiblePart[0],
            to: sortVisiblePart[sortVisiblePart.length - 1],
          }

          if (newRange.from === prevVisibleRange.current.from ||
            newRange.to === prevVisibleRange.current.to
          ) return

          prevVisibleRange.current = {
            from: newRange.from || "",
            to: newRange.to || "",
          };
          setVisibleRange({
            from: newRange.from || "",
            to: newRange.to || "",
          });
        }
      }
    }
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    }
    const observer = new IntersectionObserver(
      (entries) => callbackEntries(entries),
      options
    )
    dateRefs.current.forEach((el) => el && observer.observe(el))

    return (() => {
      dateRefs.current.forEach((el) => el && observer.unobserve(el))
    })
  }, [visibleRange])

  return (
    <div>
      <p className="font-medium text-[20px] text-center md:text-left ">
        {new Date(visibleRange.from).toLocaleString("en-CA", { month: "long" })} {new Date(visibleRange.from).getFullYear()}
      </p>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full md:w-[calc(100vw-300px)]"
      >
        <CarouselContent className="flex gap-3 px-8">
          {openDateRange.map((date, index) => {
            if (date) {
              return (
                <div key={index} className="relative">
                  {formattoLocalDate(date) === formattoLocalDate(today) &&
                    <div className="absolute top-0 left-[-5px] size-fit px-2 py-1 rounded-full bg-[#E67C73] text-[10px] text-white z-10">Today</div>
                  }
                  <Button
                    type="button"
                    variant={null}
                    data-date={formattoLocalDate(date)}
                    ref={(el) => { dateRefs.current[index] = el; }}
                    disabled={
                      !events.some(event => formattoLocalDate(new Date(event.startTime)) === formattoLocalDate(date)) &&
                        formattoLocalDate(date) !== formattoLocalDate(today)
                        ? true : false}
                    onClick={() => handleSelectDate(date)}
                    className={`
                      ${!events.some(event => formattoLocalDate(new Date(event.startTime)) === formattoLocalDate(date)) && "bg-gray-100"}
                      ${formattoLocalDate(date) === formattoLocalDate(today) && "bg-[#fffadf]"}
                      ${selectDate === formattoLocalDate(date) && "bg-[#FFCE47]"}
                      size-fit px-[2px] pb-2 pt-3 border-[1px] border-gray-300 flex flex-col rounded-xl gap-0 mt-3 `}
                  >
                    <div
                      className={`w-[40px] rounded-xl justify-center items-center flex text-[20px]`}
                    >
                      <p>{formattoLocalDate(date).split("-")[2]}</p>
                    </div>
                    <p className="text-[12px]">
                      {Intl.DateTimeFormat("en-CA", { weekday: "short" }).format(date)}
                    </p>
                  </Button>
                </div>
              );
            }
            return null;
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
