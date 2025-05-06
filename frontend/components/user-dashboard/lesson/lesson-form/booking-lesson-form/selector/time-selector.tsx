"use client"

import { generateTimePoint } from "@/components/features/time-range-calculator"
import { subtractExceptions } from "@/components/features/time-range-substract"
import { getLocationKey } from "@/components/features/travel-time"
import { Button } from "@/components/ui/button"
import { LessonBookingType } from "@/types/lesson.type"
import { SubtractRangeType, timeSelectType } from "@/types/time.type"
import { TravelTimeType } from "@/types/travelTime.type"
import { useEffect, useState } from "react"

type Props = {
  selectTime: string
  handleSelectTime: (data: string) => void
  availabilityData: SubtractRangeType[] | null
  lessonLength: number
  lessonData: LessonBookingType[] | null
  selectLocation: string
  selectedTravelTimes: TravelTimeType[]
}

export const TimeSelector = ({ selectTime, handleSelectTime, availabilityData, lessonLength, lessonData, selectLocation, selectedTravelTimes }: Props) => {

  const [lessonWithFullTime, setLessonWithFullTime] = useState<SubtractRangeType[] | null>(null)
  useEffect(() => {
    if (!lessonData || !selectLocation) return

    //new Array only for lesson time range
    const lessonTimeRange: SubtractRangeType[] = []
    lessonData.map((lesson) => {
      //get original Start time and End time in each lesson
      const originalStart: Date = new Date(lesson.startTime)
      const orginalEnd: Date = new Date(lesson.endTime)

      // Get each lesson's Location and compare with selectLocation
      const lessonLocation = lesson.location
      const matchedTravel = selectedTravelTimes.find((data) => {
        const key = getLocationKey(data)
        const currentKey = [selectLocation, lessonLocation].sort().join("-")
        return key === currentKey
      })
      const individualTravelTime: number = matchedTravel?.durationMinutes ?? 0
      if (!individualTravelTime) return

      //Add the travel time : before start time & after end time to ensure instructor can arrive on time between to locations
      const startWithTravelTime: number = originalStart.setMinutes(originalStart.getMinutes() - individualTravelTime)
      const endWithTravelTime: number = orginalEnd.setMinutes(orginalEnd.getMinutes() + individualTravelTime)
      const newStart: string = new Date(startWithTravelTime).toLocaleTimeString("en-CA", { hour12: false }).slice(0, 5)
      const newEnd: string = new Date(endWithTravelTime).toLocaleTimeString("en-CA", { hour12: false }).slice(0, 5)
      lessonTimeRange.push([newStart, newEnd])
    })

    if (lessonTimeRange.length === 0) return
    setLessonWithFullTime(() => lessonTimeRange)
  }, [lessonData, selectLocation])

  // availabilityData -> sort by lessonWithFullTime -> New Availablity Data
  const [newAvData, setNewAvData] = useState<SubtractRangeType[] | null>(null)
  useEffect(() => {
    if (!availabilityData) return
    if (!lessonWithFullTime) {
      return setNewAvData(() => availabilityData)
    }
    const substractAvFromLesson = subtractExceptions(availabilityData as SubtractRangeType[], lessonWithFullTime as SubtractRangeType[])
    return setNewAvData(() => substractAvFromLesson)
  }, [availabilityData, lessonWithFullTime])


  const [openingTime, setOpeningTime] = useState<timeSelectType>({
    morning: [],
    afternoon: [],
    evening: []
  })

  useEffect(() => {
    const newOpeningRange: timeSelectType = {
      morning: [],
      afternoon: [],
      evening: []
    }

    if (!newAvData || lessonLength === 0) return

    newAvData.forEach((range) => {
      //ex: const openingTime: timeSelectType = generateTimePoint("06:00", "22:00",60)
      const eachRange: timeSelectType = generateTimePoint(range[0], range[1], lessonLength)
      newOpeningRange.morning.push(...eachRange.morning)
      newOpeningRange.afternoon.push(...eachRange.afternoon)
      newOpeningRange.evening.push(...eachRange.evening)
    })

    setOpeningTime(() => newOpeningRange)
  }, [newAvData, lessonLength])


  return (
    <div>
      <p>Morning</p>
      {(newAvData && lessonLength !== 0) ?
        <div className="flex flex-wrap gap-3">
          {openingTime.morning.map((timePoint, index) => (
            <Button
              type="button"
              key={index}
              variant={null}
              onClick={() => handleSelectTime(timePoint)}
              className={`${selectTime === timePoint ? "text-yellow-600 border-yellow-600" : ""}  border-[2px] rounded-lg`}
            >
              {timePoint}
            </Button>
          ))}
        </div>
        : null
      }
      <p>Afternoon</p>
      {(newAvData && lessonLength !== 0) ?
        <div className="flex flex-wrap gap-3">
          {openingTime.afternoon.map((timePoint, index) => (
            <Button
              type="button"
              key={index}
              variant={null}
              onClick={() => handleSelectTime(timePoint)}
              className={`${selectTime === timePoint ? "text-yellow-600 border-yellow-600" : ""}  border-[2px] rounded-lg`}
            >
              {timePoint}
            </Button>
          ))}
        </div>
        : null
      }
      <p>Evening</p>
      {(newAvData && lessonLength !== 0) ?
        <div className="flex flex-wrap gap-3">
          {openingTime.evening.map((timePoint, index) => (
            <Button
              type="button"
              key={index}
              variant={null}
              onClick={() => handleSelectTime(timePoint)}
              className={`${selectTime === timePoint ? "text-yellow-600 border-yellow-600" : ""}  border-[2px] rounded-lg`}
            >
              {timePoint}
            </Button>
          ))}
        </div>
        : null
      }
      {/* <p>Course Length: {lessonLength ?? 0}min</p>
      <strong>Final Availability: {JSON.stringify(newAvData)}</strong> */}
      {/* <p>Opening Before Sort by lesson Length: </p> */}
      {/* <p>{JSON.stringify(openingTime)}</p> */}
      {/* <p>{JSON.stringify(selectedTravelTimes)}</p> */}
    </div>
  )
}

