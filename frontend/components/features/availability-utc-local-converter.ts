import { AvailabilityType } from "@/types/time.type";
import moment from "moment-timezone";

function resolveTimezone(timezone: string) {
  if (timezone === "local") {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return timezone;
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// 10:53 AM–10:53 PM is often submitted as 10:53–10:53 in a 12-hour picker.
function normalizeEndTime(start: string, end: string): string {
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);
  if (Number.isNaN(startMinutes) || Number.isNaN(endMinutes)) return end;
  if (endMinutes > startMinutes) return end;

  const plusTwelveHours = endMinutes + 12 * 60;
  if (plusTwelveHours > startMinutes && plusTwelveHours < 24 * 60) {
    return minutesToTime(plusTwelveHours);
  }
  return end;
}

//UTC → Local
////  From: [{ start:"ISOString" ,end:"ISOString"}]
////  To: {"YYYY-MM-DD": [["HH:mm", "HH:mm"]]}
// Call this from the browser only. Server "local" is UTC and will shift demo times.
export function convertToLocal(data: { start: string; end: string }[], timezone: string) {
  const tz = resolveTimezone(timezone);
  const result: AvailabilityType = {};

  for (const slot of data) {
    const localStart = moment.utc(slot.start).tz(tz);
    const localEnd = moment.utc(slot.end).tz(tz);

    const startDate = localStart.format("YYYY-MM-DD");
    const startTime = localStart.format("HH:mm");
    const endDate = localEnd.format("YYYY-MM-DD");
    const endTime = localEnd.format("HH:mm");

    if (!result[startDate]) result[startDate] = [];
    result[startDate].push([startTime, endTime]);

    if (startDate !== endDate) {
      if (!result[endDate]) result[endDate] = [];
      result[endDate].push(["00:00", endTime]);
    }
  }
  return result;
}

//Local → UTC
////  From: {"YYYY-MM-DD": [["HH:mm", "HH:mm"]]}
////  To: [{ start:"ISOString" ,end:"ISOString"}]
export function convertToUTC(data: AvailabilityType, timezone: string) {
  const tz = resolveTimezone(timezone);
  const result = [];

  for (const date in data) {
    for (const [start, rawEnd] of data[date]) {
      const end = normalizeEndTime(start, rawEnd);
      const localDate = moment.tz(`${date} ${start}`, "YYYY-MM-DD HH:mm", tz);
      const localEndDate = moment.tz(`${date} ${end}`, "YYYY-MM-DD HH:mm", tz);

      //If the end time is earlier than the start time, it means the time range spans into the next day.
      if (localEndDate.isBefore(localDate)) {
        localEndDate.add(1, "day");
      }

      result.push({
        start: localDate.utc().format(),
        end: localEndDate.utc().format(),
      });
    }
  }
  return result;
}
