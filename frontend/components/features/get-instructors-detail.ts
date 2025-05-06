import { getInstructorsAvailabilityiesType, getInstructorsNameType } from "@/types/time.type";
import { UserType } from "@/types/user.type";
import { convertToLocal } from "./availability-utc-local-converter";

export const getAllAvailabilities = (instructorData: UserType[]): getInstructorsAvailabilityiesType[] => {
  const localAvailabilities: getInstructorsAvailabilityiesType[] = [];
  if (!instructorData) return [];
  //Get Availability array of each instructor
  instructorData.map((instructor: UserType) => {
    const availabilityArray = Array.isArray(instructor.availability)
      ? instructor.availability.map((slot: { [key: string]: string }) => ({ start: slot.start, end: slot.end }))
      : [];
    //Sort the time by UTC start time before conversion
    const sortedAvailabilityArray = availabilityArray.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    //Convert UTC DB format to Local Frontend Format
    const localAvailability = convertToLocal(sortedAvailabilityArray, "local");
    localAvailabilities.push({ id: instructor.id, availability: localAvailability });
  });
  return localAvailabilities;
}

export const getInstructorsName = (instructorData: UserType[]): getInstructorsNameType[] => {
  if (!instructorData) return []
  return instructorData.map(({ id, firstName }) => ({
    id,
    firstName
  }))
}