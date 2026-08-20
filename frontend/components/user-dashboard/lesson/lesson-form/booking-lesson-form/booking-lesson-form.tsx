"use client";
import { convertToLocal } from "@/components/features/availability-utc-local-converter";
import { formattoLocalDate } from "@/components/features/date-input-select-check";
import { convertlessonFromUTCToLocal } from "@/components/features/lesson-utc-local-converter";
import { getSelectableLocations } from "@/components/features/selectable-location";
import { getEndTime } from "@/components/features/time-range-calculator";
import { Button } from "@/components/ui/button";
import { InstructorSelector } from "@/components/user-dashboard/global-selector/instructor-selector";
import { toast } from "@/hooks/use-toast";
import { LessonBookingType, LessonRequestData } from "@/types/lesson.type";
import { LessonTypeInterface } from "@/types/lessonType.type";
import {
  AvailabilityType,
  getInstructorsAvailabilityiesType,
  getInstructorsNameType,
} from "@/types/time.type";
import { TravelTimeType } from "@/types/travelTime.type";
import { createLesson } from "@/utils/lessonFetch";
import React, { useEffect, useMemo, useState } from "react";
import "../lesson-form.css";
import { SelectDateTime } from "./selector/date-time-group";

type Props = {
  instructors: getInstructorsNameType[];
  availabilities: getInstructorsAvailabilityiesType[];
  lessons: LessonBookingType[];
  initialNewLessonState: LessonRequestData;
  lessonTypes: LessonTypeInterface[];
  travelTimes: TravelTimeType[];
};

export default function BookingLessonForm({
  instructors,
  availabilities,
  lessons,
  initialNewLessonState,
  lessonTypes,
  travelTimes,
}: Props) {
  //SelectClass to set Length
  const [lessonLength, setLessonLength] = useState<number>(0);
  const [selectedTravelTimes, setSelectedTravelTimes] = useState<
    TravelTimeType[]
  >([]);
  const [newLesson, setNewLesson] = useState<LessonRequestData>(
    initialNewLessonState
  );

  const localAvailabilities = useMemo(
    () =>
      availabilities.map((item) => ({
        id: item.id,
        availability: convertToLocal(item.utcSlots, "local"),
      })),
    [availabilities]
  );

  const localSelectAvailability = (): AvailabilityType | null => {
    const selectedLocalAv: AvailabilityType | null =
      localAvailabilities.find((item) => item.id === newLesson.instructorId)
        ?.availability ?? null;
    if (!selectedLocalAv) return null;
    return selectedLocalAv;
  };

  const localSelectLessons = (): LessonBookingType[] | null => {
    const utcLsn: LessonBookingType[] | null =
      lessons.filter((data) => data.instructorId === newLesson.instructorId) ??
      null;
    if (!utcLsn) return null;
    const localLsn = convertlessonFromUTCToLocal(utcLsn);
    return localLsn;
  };

  const dateSelectable = (selectDate: string): boolean => {
    const selectedAv = localSelectAvailability();
    if (!selectedAv || !selectedAv[selectDate]) return false;
    const selectDateLessons = lessons.filter(
      //Compare Date  with formattoLocalDate(date)
      (lesson) => formattoLocalDate(new Date(lesson.startTime)) === selectDate
    );
    const hasExistingLesson = selectDateLessons.some(
      (lesson) => lesson.studentId === newLesson.studentId
    );
    if (hasExistingLesson) return false;
    else return true;
  };

  const selectedLocations: string[] = getSelectableLocations(travelTimes);

  const handleClearLesson = () => {
    setNewLesson(() => initialNewLessonState);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewLesson((prevState) => ({
      ...prevState,
      [name]:
        name === "instructorId" || name === "instructor"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createLesson({
      ...newLesson,
      startTime: new Date(newLesson.startTime.replace(",", "T")).toISOString(),
      endTime: new Date(newLesson.endTime.replace(",", "T")).toISOString(),
    });
    if (response) {
      console.log("success create lesson", response);
      handleClearLesson();
      toast({
        variant: "success",
        description: "Lessons purchased successfully",
      });
      setTimeout(() => {
        window.location.href = "/student/lessons";
      }, 1500);
    } else {
      console.error("Failed to create lesson");
    }
  };

  const handleLessonLength = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const length = lessonTypes.find(
      (lessontype) => lessontype.lessonName === value
    )?.lessonLength;
    if (!length) return;
    setLessonLength(() => length);
  };

  //set lesson endtime after
  //// 1. lesson length change (availability[] already being filtered)
  //// 2. select the startTime
  useEffect(() => {
    if (!newLesson.startTime || !lessonLength) return;
    const timePart = newLesson.startTime.includes(",")
      ? newLesson.startTime.split(",")[1]
      : newLesson.startTime;
    const datePart = newLesson.startTime.includes(",")
      ? newLesson.startTime.split(",")[0]
      : "";
    const endTimePart = getEndTime(timePart, lessonLength);
    setNewLesson((prevState) => ({
      ...prevState,
      endTime: datePart ? `${datePart},${endTimePart}` : endTimePart,
    }));
  }, [lessonLength, newLesson.startTime]);

  useEffect(() => {
    const location = newLesson.location;
    const matchedData = travelTimes.filter(
      (data) => data.location1 === location || data.location2 === location
    );
    setSelectedTravelTimes(() => matchedData);
  }, [newLesson.location, travelTimes]);

  useEffect(() => {
    console.log(newLesson);
  }, [newLesson]);

  if (initialNewLessonState.invoiceId === 0) {
    return (
      <div className='rounded-2xl border border-gray-200 bg-[#EDEFEC] px-6 py-10 text-center'>
        <p className='font-bold tracking-tight text-black'>Please purchase a lesson first.</p>
      </div>
    );
  }

  const fieldClassName =
    "w-full h-11 rounded-full border border-gray-200 bg-white px-5 text-sm font-semibold text-black shadow-sm outline-none transition-colors hover:text-black focus:border-black focus:bg-[#EDEFEC]";

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='lesson-form flex w-full flex-col gap-6 rounded-2xl border border-gray-200 bg-white px-5 py-6 lg:px-8 lg:py-8'
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='lessonType' className='font-bold tracking-tight text-black'>
            Select class
          </label>
          <select
            name='lessonType'
            id='lessonType'
            defaultValue={""}
            onChange={(e) => handleLessonLength(e)}
            className={fieldClassName}
            required
          >
            <option value='' className='text-gray-500' disabled>
              Select class
            </option>
            {lessonTypes.map((lessonType) => (
              <option key={lessonType.id} value={lessonType.lessonName}>
                {lessonType.lessonName}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='instructor' className='font-bold tracking-tight text-black'>
            Select instructor
          </label>
          <InstructorSelector
            instructorId={newLesson.instructorId}
            instructors={instructors}
            handleChange={handleChange}
            isAddingAvailability={true}
            selectClassName={fieldClassName}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='location' className='font-bold tracking-tight text-black'>
            Select location
          </label>
          <select
            name='location'
            id='location'
            value={newLesson.location}
            onChange={handleChange}
            className={fieldClassName}
            required
          >
            <option value='' className='text-gray-500' disabled>
              Select location
            </option>
            {selectedLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <SelectDateTime
          dateSelectable={dateSelectable}
          selectedAvailability={localSelectAvailability()}
          selectedInstuctorLessons={localSelectLessons()}
          setNewLesson={setNewLesson}
          newLesson={newLesson}
          lessonLength={lessonLength}
          selectedTravelTimes={selectedTravelTimes}
        />
        <Button
          type='submit'
          className='h-12 w-full rounded-full bg-[#FFCE47] text-base font-bold text-black hover:bg-[#f7c948]'
        >
          Submit
        </Button>
      </form>
      {/* <p><strong>localAvailability: </strong>{JSON.stringify(localSelectAvailability())}</p>
      <p><strong>localLessons: </strong>{JSON.stringify(localSelectLessons())}</p>
      <p>{JSON.stringify(lessonTypes)}</p>
      <p>{JSON.stringify(selectedTravelTimes)}</p>
      <p>{JSON.stringify(selectedLocations)}</p> */}
    </div>
  );
}
