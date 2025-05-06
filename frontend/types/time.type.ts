export type RangeType = [string, string] | [null, null]  //[start,end]

export type SubtractRangeType = [string, string]

export type AvailabilityType = { [key: string]: SubtractRangeType[] }
// = Record<string, RangeType[]>

export type utcAvailabilityType = { start: string, end: string }[]

export type getInstructorsAvailabilityiesType = {
  id: number
  availability: AvailabilityType //-> goes to "dbAvailabilityType"
}

export type getInstructorsNameType = {
  id: number
  firstName: string
}

export type timeSelectType = {
  morning: string[],
  afternoon: string[],
  evening: string[]
}

