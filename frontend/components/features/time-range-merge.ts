import { SubtractRangeType } from "@/types/time.type";


//sort and merge time range array
export const mergeTimeRanges = (timeRanges: SubtractRangeType[]) => {
  // filter the empty array
  const validRanges = timeRanges.filter(([start, end]) => start && end);

  // sort for earlier time range
  validRanges.sort((a, b) => (a[0] > b[0] ? 1 : -1));

  const merged: [string, string][] = [];

  for (const [start, end] of validRanges) {
    if (merged.length === 0 || merged[merged.length - 1][1] < start) {
      // added directed
      merged.push([start, end]);
    } else {
      // merge time range
      merged[merged.length - 1][1] = end > merged[merged.length - 1][1] ? end : merged[merged.length - 1][1];
    }
  }

  return merged;
};
