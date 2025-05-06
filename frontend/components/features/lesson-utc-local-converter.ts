import { LessonBookingType } from "@/types/lesson.type";


//dateTimeString:  "2025-05-04T09:00:00.000Z" (for convertlessonFromUTCToLocal)
//return: YYYY-MM-DD HH:mm
export const convertDateTimeUTCtoLocal = (dateTimeString: string): string => {
  const utcDate = new Date(dateTimeString)
  const localDateTime = new Date(`${utcDate}`).toLocaleString("en-CA", {
    timeZoneName: "short", // check local time
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .replace(/\s[A-Za-z]{3,4}$/, "") // remove PDT,EST
    .replace(/,\s?/, " ") // remove "," or" "
  return localDateTime
}


export const convertlessonFromUTCToLocal = (utcLessons: LessonBookingType[] | null): LessonBookingType[] | null => {
  if (!utcLessons) return null
  const localLessonData = utcLessons.map((lesson) => ({
    ...lesson,
    startTime: convertDateTimeUTCtoLocal(lesson.startTime),
    endTime: convertDateTimeUTCtoLocal(lesson.endTime),
  }))
  return localLessonData
}