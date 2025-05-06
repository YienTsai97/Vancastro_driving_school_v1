import { timeSelectType } from "@/types/time.type";

export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export const minutesToTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}


export const generateTimePoint = (start: string, end: string, lessonLength: number): timeSelectType => {
  const timePoints: timeSelectType = {
    morning: [],
    afternoon: [],
    evening: []
  }
  const current = new Date(`2025-01-01T${start}`)
  const endTime = new Date(`2025-01-01T${end}`)


  while (current <= endTime) {
    // if timePoint + lesson's time Length > endTime, then this time is unavailable for the course >> so skip it
    const lessonEndTime = new Date(current)
    lessonEndTime.setMinutes(current.getMinutes() + lessonLength)
    if (lessonEndTime > endTime) { break }

    //sort the time point to different group
    if (current.getHours() <= 11) {
      timePoints.morning.push(current.toTimeString().slice(0, 5))
    }
    if (current.getHours() >= 12 && current.getHours() <= 18) {
      timePoints.afternoon.push(current.toTimeString().slice(0, 5))
    }
    if (current.getHours() >= 19 && current.getHours() <= 23) {
      timePoints.evening.push(current.toTimeString().slice(0, 5))
    }
    //ex: "09:00:00 GMT+0000 (Coordinated Universal Time)".slice(0, 5)  = "09:00"

    //current + 15min
    current.setMinutes(current.getMinutes() + 15)
  }
  return timePoints;
}

//Calculate Courses EndTime by the StartTime
export const getEndTime = (start: string, timeLengthMin: number): string => {

  const startTime = new Date(`2025-01-01T${start}`)
  const endTime = startTime.setMinutes(startTime.getMinutes() + timeLengthMin)
  const result = new Date(endTime).toTimeString().slice(0, 5)

  return result
}