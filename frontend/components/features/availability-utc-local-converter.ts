import { AvailabilityType } from "@/types/time.type";
import moment from "moment-timezone";

function resolveTimezone(timezone: string) {
  if (timezone === "local") {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return timezone;
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

    //If the time range crosses into the next day, keep this date's slot until midnight.
    if (startDate !== endDate) {
      result[startDate].push([startTime, "24:00"]);
      if (!result[endDate]) result[endDate] = [];
      result[endDate].push(["00:00", endTime]);
    } else {
      result[startDate].push([startTime, endTime]);
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
    for (const [start, end] of data[date]) {
      const localDate = moment.tz(`${date} ${start}`, "YYYY-MM-DD HH:mm", tz);
      const localEndDate = moment.tz(
        `${date} ${end === "24:00" ? "00:00" : end}`,
        "YYYY-MM-DD HH:mm",
        tz
      );

      //If the end time is earlier than the start time, it means the time range spans into the next day.
      if (end === "24:00" || localEndDate.isSameOrBefore(localDate)) {
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
