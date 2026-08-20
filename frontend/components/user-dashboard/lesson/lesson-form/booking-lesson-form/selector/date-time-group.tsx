"use client"
import { formattoLocalDate } from "@/components/features/date-input-select-check";
import { getEndTime } from "@/components/features/time-range-calculator";
import { LessonBookingType, LessonRequestData } from "@/types/lesson.type";
import { AvailabilityType } from "@/types/time.type";
import { TravelTimeType } from "@/types/travelTime.type";
import React, { useEffect, useState } from "react";
import { DateSelector } from "./date-selector";
import { TimeSelector } from "./time-selector";

type Props = {
  dateSelectable: (date: string) => boolean
  selectedAvailability: AvailabilityType | null,
  selectedInstuctorLessons: LessonBookingType[] | null,
  setNewLesson: (value: React.SetStateAction<LessonRequestData>) => void,
  newLesson: LessonRequestData,
  lessonLength: number | null,
  selectedTravelTimes: TravelTimeType[]
}

export const SelectDateTime = ({ dateSelectable, selectedAvailability, selectedInstuctorLessons, setNewLesson, newLesson, lessonLength, selectedTravelTimes }: Props) => {
  // Availability of this two month
  const [availability, setAvailavility] = useState<AvailabilityType | null>(selectedAvailability);

  // Existing Lesson Data of this two month
  const [lessons, setLessons] = useState<LessonBookingType[] | null>(selectedInstuctorLessons);

  // Date
  const [selectDate, setSelectDate] = useState<string>('');
  const handleSelectDate = (data: Date) => {
    const localStringData = formattoLocalDate(data);
    setSelectDate(() => localStringData)
  }

  // Time
  const [selectTime, setSelectTime] = useState<string>('');
  const handleSelectTime = (data: string) => {
    setSelectTime(() => data)
    const start = `${selectDate},${data}:00`
    const end = lessonLength ? `${selectDate},${getEndTime(data, lessonLength)}:00` : null
    setNewLesson(prevState => ({
      ...prevState,
      startTime: start,
      endTime: end ? end : ""
    }))
  }

  //Availability Data sort by Instructor Id and Selected Date by default and switch to local time data, or return null
  useEffect(() => {
    setAvailavility(() => {
      if (!selectedAvailability) return null;
      const selectedTimeRange = { [selectDate]: selectedAvailability[selectDate] }
      return selectedTimeRange; // Ensure it matches AvailabilityType
    });
  }, [selectDate, selectedAvailability]);

  // Lessons Data ( already sort by Instructor Id) is selected Date by default , or return null
  useEffect(() => {
    setLessons(() => {
      if (!selectedInstuctorLessons || !selectDate) return null;
      const data = selectedInstuctorLessons.filter((item) =>
        item.startTime.substring(0, 10) === selectDate
      )
      return data;
    });
  }, [selectedInstuctorLessons, selectDate]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <label className="font-bold tracking-tight text-black">Select date</label>
          {selectDate ? (
            <span className="rounded-full bg-[#EDEFEC] px-3 py-1 text-[11px] font-bold text-black">
              {selectDate}
            </span>
          ) : null}
        </div>
        <DateSelector
          dateSelectable={dateSelectable}
          selectDate={selectDate}
          handleSelectDate={handleSelectDate}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <label className="font-bold tracking-tight text-black">Select time</label>
          {selectTime ? (
            <span className="rounded-full bg-[#E67C73] px-2 py-0.5 text-[11px] font-bold leading-none text-white">
              {selectTime}
            </span>
          ) : null}
        </div>
        <TimeSelector
          selectTime={selectTime}
          handleSelectTime={handleSelectTime}
          availabilityData={availability ? (availability[selectDate] ?? null) : null}
          lessonLength={lessonLength ?? 0}
          lessonData={lessons ? lessons : null}
          selectLocation={newLesson.location}
          selectedTravelTimes={selectedTravelTimes} />
      </div>

      {/* Delete /Hide it when no need for testing */}
      {/* <div>
        <div className="text-blue-700">
          <p>1. selected Instructor:{newLesson.instructorId}</p>
          <p>2. selected Date:{selectDate}</p>
          <p>3. Lessons Result:</p>
          <strong>{lessons ? JSON.stringify(lessons) : "loading (type null)"}</strong>
        </div>
        <div className="text-red-700">
          <p>4. Availability Result of selected Instructor / Date</p>
          <strong>{availability ? JSON.stringify(availability) : "loading (type null)"}</strong>
        </div> */}
        {/* <p>availability: {JSON.stringify(availability)}</p>
        <p>selectedInstuctorLessons:{JSON.stringify(selectedInstuctorLessons)}</p> */}
      {/* </div> */}
    </>
  )
}



