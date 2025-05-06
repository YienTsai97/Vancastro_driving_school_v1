import { SubtractRangeType } from "@/types/time.type";
import { timeToMinutes, minutesToTime } from "./time-range-calculator";

export const subtractExceptions = (available: SubtractRangeType[], exceptions: SubtractRangeType[]): SubtractRangeType[] => {
  let result: SubtractRangeType[] = [...available];

  exceptions.forEach(([exStart, exEnd]) => {
    result = result.flatMap(([avStart, avEnd]) => {
      const start = timeToMinutes(avStart);
      const end = timeToMinutes(avEnd);
      const exS = timeToMinutes(exStart);
      const exE = timeToMinutes(exEnd);

      if (exE <= start || exS >= end) return [[avStart, avEnd]];

      const newRanges: SubtractRangeType[] = [];
      if (exS > start) newRanges.push([avStart, minutesToTime(exS)]);
      if (exE < end) newRanges.push([minutesToTime(exE), avEnd]);

      return newRanges;
    });
  });
  return result;
}