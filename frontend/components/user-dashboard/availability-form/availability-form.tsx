"use client";
import { convertToUTC } from "@/components/features/availability-utc-local-converter";
import { formattoLocalDate } from "@/components/features/date-input-select-check";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import plus from "@/public/assets/dashboard/plus.svg";
import {
  AvailabilityType,
  getInstructorsAvailabilityiesType,
  getInstructorsNameType,
  RangeType,
  SubtractRangeType,
  utcAvailabilityType,
} from "@/types/time.type";
import { updateUser } from "@/utils/userFetch";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { InstructorSelector } from "../global-selector/instructor-selector";
import AvailabilityList from "./availability-list";
import DateRangeSelector from "./selector/date-range-selector";
import DayRangeSelector from "./selector/day-range-selector";
import { TimeRangeGroup } from "./selector/time-range-group";

type Props = {
  instructors: getInstructorsNameType[];
  availabilities: getInstructorsAvailabilityiesType[];
};

export const AvailabilityForm = ({ instructors, availabilities }: Props) => {
  //Add button
  const [isAdding, setIsAdding] = useState<boolean>(false);
  //Instructor Select
  const [instructorId, setInstructorId] = useState<number | null>(1);
  const handleInstructorId = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInstructorId(() => Number(e.target.value) ?? null);
  };

  // Get Existing Data (local time availability)
  const [availability, setAvailability] = useState<AvailabilityType>({});
  const selectedLocalAv =
    availabilities.find((availability) => availability.id === instructorId)
      ?.availability || {};

  // Date selection
  const [dateRange, setDateRange] = useState<RangeType | [null]>([null]);
  const [isSingle, setIsSingle] = useState<boolean>(false);

  // Day selection
  const [selectedDays, setSelectedDays] = useState<(number | null)[]>([]);
  const [selectDates, setSelectDates] = useState<string[]>([]);

  // Time selection
  const [selectTime, setSelectTime] = useState<RangeType[]>([]);

  // Update availability when instructor changes
  useEffect(() => {
    if (!instructorId) return;
    const selectedAvailability =
      availabilities.find((availability) => availability.id === instructorId)
        ?.availability || {};
    setAvailability(() => selectedAvailability);
  }, [instructorId, availabilities]);

  //Date(s) select
  const [isSelectedFromList, setIsSelectedFromList] = useState<boolean>(false);
  const handleSelectedFromList = (state: boolean) => {
    setIsSelectedFromList(() => state);
  };
  const handleDateRange = (startDate: string, endDate: string) => {
    setDateRange(() => [startDate, endDate]);
  };

  // Handle day selection
  const handleSelectedDay = (newDays: (number | null)[]) => {
    setSelectedDays(() => newDays);
  };

  // Handle time selection
  const handleSelectedTime = (newTimes: SubtractRangeType[]) => {
    setSelectTime(() => newTimes);
  };

  // Filter dates based on selected days
  useEffect(() => {
    if (dateRange[0] === null) return setSelectDates(() => []);
    if (dateRange[0] === dateRange[1]) {
      // click from single date-list item
      if (isSelectedFromList) setIsSingle(() => true);
      return setSelectDates(() => [dateRange[0]]);
    }
    if (isSingle && dateRange[0]) return setSelectDates(() => [dateRange[0]]);
    if (!dateRange[0] || !dateRange[1]) return;

    const tempRange: string[] = [];
    // start = new Date(dateRange[0])  // *Prevent using UTC format
    const start = new Date(`${dateRange[0]}T00:00:00`); // Correct Local Format
    const end = new Date(`${dateRange[1]}T00:00:00`);

    while (start <= end) {
      const dayIndex = start.getDay();

      if (selectedDays.includes(dayIndex)) {
        tempRange.push(formattoLocalDate(start));
      }
      start.setDate(start.getDate() + 1);
    }
    setSelectDates(() => tempRange);
  }, [dateRange, selectedDays, isSingle]);

  //Combine Date Range and Time Range & OverWrite Availability[date]
  const overwriteSelectedtime = (): AvailabilityType => {
    const newAvailability: AvailabilityType = { ...(selectedLocalAv || {}) };
    selectDates.forEach((date) => {
      newAvailability[date] = selectTime.filter(
        (time): time is SubtractRangeType =>
          time[0] !== null &&
          time[0] !== "" &&
          time[1] !== null &&
          time[1] !== ""
      );
    });
    // setAvailability(() => newAvailability)
    return newAvailability;
  };

  const handleReset = () => {
    setInstructorId(() => null);
    setDateRange(() => [null]);
    setSelectedDays(() => []);
    setSelectTime(() => []);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructorId) return;
    // OverWrite Availability[date]
    const newAvailability = overwriteSelectedtime();
    // Form local type convert to UTC data
    const utcAvailability: utcAvailabilityType = convertToUTC(
      newAvailability,
      "local"
    );
    // Update User Availability to DB
    const response = await updateUser({
      id: instructorId,
      availability: utcAvailability as unknown as JSON,
    });
    if (response) {
      console.log("success Update Availability", response);
      toast({
        variant: "success",
        description: "Availability updated successfully",
      });
      setTimeout(() => {
        window.location.href = "/instructor/availability";
      }, 1500);
    } else {
      console.error("Failed to update availability");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='availability-form p-6 h-full w-full flex flex-col gap-10 relative'
      >
        {/* Select Instructor */}
        <div className='absolute top-0 right-0 px-6 py-3 z-1 w-full bg-white'>
          {isAdding && (
            <>
              <Button
                variant={null}
                onClick={() => setIsAdding(() => false)}
                className='flex text-[#777777] active:text-black hover:text-black p-0 pb-6'
              >
                <ChevronLeft /> Back
              </Button>
              <p className='text-[18px] font-semibold pb-4'>
                Select Instructor
              </p>
            </>
          )}
          <InstructorSelector
            instructorId={instructorId}
            instructors={instructors}
            handleChange={handleInstructorId}
            isAddingAvailability={isAdding}
          />
        </div>

        {!isAdding && instructorId && (
          /* Show selected availability list */
          <div className='h-fit overflow-y-auto mt-[36px] pb-20'>
            <AvailabilityList
              instructorId={instructorId}
              availability={availability}
              setAvailability={setAvailability}
              handleDateRange={handleDateRange}
              isSelectedFromList={isSelectedFromList}
              handleSelectedFromList={handleSelectedFromList}
              selectTime={selectTime}
              setSelectTime={handleSelectedTime}
              singleRangeData={isSingle ? availability[selectDates[0]] : null}
              isSingleDate={isSingle}
              handleSubmit={handleSubmit}
            />
          </div>
        )}

        {isAdding && (
          <div className='flex flex-col pt-[120px] gap-10 sm:w-fit'>
            {/* Select Day Range */}
            {instructorId && (
              <>
                <div className='flex flex-col gap-4'>
                  <div className='flex justify-between items-center'>
                    <p className='text-[18px] font-semibold'>
                      Select Date & Time
                    </p>
                    <Button
                      type='button'
                      onClick={() => {
                        handleSelectedFromList(false);
                        setIsSingle((prev) => !prev);
                      }}
                      variant={isSingle ? "secondary" : "outline"}
                      className={"border-[#2F2F2F]"}
                    >
                      {isSingle ? "Date Range" : "Single Date"}
                    </Button>
                  </div>
                  <DateRangeSelector
                    range={dateRange}
                    handleDateRange={handleDateRange}
                    isSingleDate={isSingle}
                  />
                </div>

                {/* Selected day (Mon~Sun checkbox) */}
                {isSingle || dateRange[1] === "" ? null : (
                  <DayRangeSelector
                    selectedDays={selectedDays}
                    handleSelectedDay={handleSelectedDay}
                  />
                )}
              </>
            )}
            {/*Selected Time Range Group*/}
            {selectDates[0] && dateRange[1] !== "" && (
              <>
                <TimeRangeGroup
                  selectTime={selectTime}
                  setSelectTime={handleSelectedTime}
                  singleRangeData={
                    isSingle ? availability[selectDates[0]] : null
                  }
                  isSingleDate={isSingle}
                />
                <div className='flex flex-col sm:flex-row gap-3'>
                  <Dialog>
                    <DialogTrigger className='w-full bg-[#FFCE47] font-semibold text-sm rounded-md py-2 px-4'>
                      Create
                    </DialogTrigger>
                    <DialogContent className='flex flex-col gap-6'>
                      <DialogHeader className='flex flex-col gap-4'>
                        <DialogTitle>Create availability?</DialogTitle>
                        <DialogDescription>
                          During the specified period, times outside the
                          availability will not be bookable.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <div className='flex gap-2'>
                          <DialogClose className='w-full' asChild>
                            <Button
                              variant={"outline"}
                              className='w-full border-[#2F2F2F]'
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            variant={null}
                            type='submit'
                            onClick={handleSubmit}
                            className=' bg-[#FFCE47] w-full font-semibold'
                          >
                            Create
                          </Button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant={"outline"}
                    type='reset'
                    onClick={handleReset}
                    className='w-full  font-semibold border-[#2F2F2F]'
                  >
                    Reset
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </form>

      {!isAdding && !isSelectedFromList && (
        <Button
          variant={null}
          type='button'
          onClick={() => {
            handleReset();
            setIsAdding(() => true);
          }}
          className='fixed right-7 bottom-7 size-14 rounded-full bg-[#FFCE47] z-10 shadow-md'
        >
          <Image src={plus} alt='add availability' height={22} width={22} />
        </Button>
      )}
    </>
  );
};
