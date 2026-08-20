import { getInstructorsAvailabilityiesType, getInstructorsNameType } from "@/types/time.type";
import { UserType } from "@/types/user.type";

export const getAllAvailabilities = (
  instructorData: UserType[]
): getInstructorsAvailabilityiesType[] => {
  const utcAvailabilities: getInstructorsAvailabilityiesType[] = [];
  if (!instructorData) return [];
  instructorData.map((instructor: UserType) => {
    const utcSlots = Array.isArray(instructor.availability)
      ? instructor.availability.map((slot: { [key: string]: string }) => ({
          start: slot.start,
          end: slot.end,
        }))
      : [];
    const sortedUtcSlots = utcSlots.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
    utcAvailabilities.push({ id: instructor.id, utcSlots: sortedUtcSlots });
  });
  return utcAvailabilities;
}

export const getInstructorsName = (instructorData: UserType[]): getInstructorsNameType[] => {
  if (!instructorData) return []
  return instructorData.map(({ id, firstName }) => ({
    id,
    firstName
  }))
}
