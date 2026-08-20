import { AvailabilityType, getInstructorsAvailabilityiesType } from "@/types/time.type";
import moment from "moment-timezone";

// Must run in the browser. On the server, "local" is UTC and demo times shift by 8 hours.
function browserTz(timezone: string) {
  return timezone === "local"
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : timezone;
}

//UTC → Local
////  From: [{ start:"ISOString" ,end:"ISOString"}]
////  To: {"YYYY-MM-DD": [["HH:mm", "HH:mm"]]}
export function convertToLocal(data: { start: string; end: string }[], timezone: string) {
  const tz = browserTz(timezone);
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

export function toLocalAvailabilities(items: getInstructorsAvailabilityiesType[]) {
  return items.map((item) => ({
    id: item.id,
    availability: convertToLocal(item.utcSlots, "local"),
  }));
}

//Local → UTC
////  From: {"YYYY-MM-DD": [["HH:mm", "HH:mm"]]}
////  To: [{ start:"ISOString" ,end:"ISOString"}]
export function convertToUTC(data: AvailabilityType, timezone: string) {
  const tz = browserTz(timezone);
  const result = [];

  for (const date in data) {
    for (const [start, end] of data[date]) {
      const localDate = moment.tz(`${date} ${start}`, "YYYY-MM-DD HH:mm", tz);
      const localEndDate = moment.tz(`${date} ${end}`, "YYYY-MM-DD HH:mm", tz);

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
