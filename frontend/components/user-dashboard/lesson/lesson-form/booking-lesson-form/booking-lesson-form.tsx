"use client";
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
import React, { useEffect, useState } from "react";
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

  const localSelectAvailability = (): AvailabilityType | null => {
    const selectedLocalAv: AvailabilityType | null =
      availabilities.find((item) => item.id === newLesson.instructorId)
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
      startTime: new Date(newLesson.startTime).toISOString(),
      endTime: new Date(newLesson.endTime).toISOString(),
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
    if (!newLesson.startTime) return;
    setNewLesson((prevState) => ({
      ...prevState,
      endTime: getEndTime(newLesson.startTime, length),
    }));
  }, [lessonLength]);

  useEffect(() => {
    const location = newLesson.location;
    const matchedData = travelTimes.filter(
      (data) => data.location1 === location || data.location2 === location
    );
    setSelectedTravelTimes(() => matchedData);
  }, [newLesson.location]);

  useEffect(() => {
    console.log(newLesson);
  }, [newLesson]);

  if (initialNewLessonState.invoiceId === 0) {
    return (
      <div className='flex justify-center items-center h-full'>
        <p className='text-gray-500'>Please purchase a lesson first.</p>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='lesson-form flex flex-col gap-[25px] md:gap-[20px] px-[15px] py-[20px] lg:px-[36px] lg:py-[24px]  border-gray-500 border-[2px] rounded-2xl  h-full w-max max-w-[500px]'
      >
        {/* Select Class */}
        <div className='flex flex-col gap-[6px]'>
          <label>
            Select class
            {/* ({lessonLength}) */}
          </label>
          <select
            name='lessonType'
            id='lessonType'
            defaultValue={""}
            onChange={(e) => handleLessonLength(e)}
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

        {/* Select Instructor */}
        <InstructorSelector
          instructorId={newLesson.instructorId}
          instructors={instructors}
          handleChange={handleChange}
          isAddingAvailability={true}
        />

        {/* Select Location */}
        <div className='flex flex-col gap-[6px]'>
          <label>Select Location</label>
          <select
            name='location'
            id='location'
            value={newLesson.location}
            onChange={handleChange}
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

        {/* Select Date Time */}
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
          className='bg-[#FFCE47] text-black  lg:bg-[#333333] lg:text-[#FFF5D8] hover:bg-[#FFF5D8] lg:hover:bg-[#4e4330] text-[20px] font-bold w-full  h-[35px] lg:h-[45px]'
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
