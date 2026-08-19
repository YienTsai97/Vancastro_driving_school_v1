"use client"
import { formattoLocalDate, getDates, twoDaysLater, twoMonthsLater } from "@/components/features/date-input-select-check";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";


type Props = {
  dateSelectable: (date: string) => boolean
  selectDate: string
  handleSelectDate: (data: Date) => void
}



export const DateSelector = ({ dateSelectable, selectDate, handleSelectDate }: Props) => {
  //get twoDaysLater and twoMonthLater from today
  const today = new Date();
  const startDate: Date = twoDaysLater(today)
  const endDate: Date = twoMonthsLater(today)

  // Opening Date Group 
  const openDateRange: Date[] = getDates(startDate, endDate)
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
    const observedElements = dateRefs.current.filter(
      (element): element is HTMLButtonElement => element !== null
    )
    observedElements.forEach((element) => observer.observe(element))

    return (() => {
      observedElements.forEach((element) => observer.unobserve(element))
    })
  }, [visibleRange])

  return (
    <>
      <p className="w-full text-center text-sm font-semibold text-[#777777]">
        {visibleRange.from && visibleRange.to
          ? `${visibleRange.from} ~ ${visibleRange.to}`
          : "Scroll to pick a date"}
      </p>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className=" m-auto w-[80%]"
      >
        <CarouselContent>
          {openDateRange.map((date, index) =>
            <div key={index} className="text-black">
              {date &&
                <Button
                  type="button"
                  variant={null}
                  data-date={formattoLocalDate(date)}
                  ref={(el) => { dateRefs.current[index] = el; }}
                  onClick={() => handleSelectDate(date)}
                  className={`h-auto w-fit px-2 py-2 hover:text-black ${
                    selectDate === formattoLocalDate(date)
                      ? "font-bold text-black"
                      : "font-semibold text-[#777777]"
                  }`}
                  disabled={dateSelectable(formattoLocalDate(date)) ? false : true}
                >
                  <div className="flex flex-col gap-1 text-center ">
                    <p className="text-xs tracking-tight">
                      {Intl.DateTimeFormat("en-CA", { weekday: "short" }).format(date)}
                    </p>
                    <div className={`
                      flex size-10 items-center justify-center rounded-full
                      ${selectDate === formattoLocalDate(date) ? "bg-[#EDEFEC] font-bold text-black" : ""}
                      ${dateSelectable(formattoLocalDate(date)) ? "" : "bg-gray-100 text-gray-400"}
                    `}>
                      <p>{formattoLocalDate(date).split("-")[2]}</p>
                    </div>
                  </div>
                </Button>
              }
            </div>
          )
          }
        </CarouselContent>
        <CarouselPrevious type="button" />
        <CarouselNext type="button" />
      </Carousel >
    </>
  )
}
