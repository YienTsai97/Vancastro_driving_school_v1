import { TravelTimeType } from "@/types/travelTime.type"

export const getSelectableLocations = (travelTimeData: TravelTimeType[]): string[] => {
  const locationArray: string[] = []
  travelTimeData.forEach((data) => {
    locationArray.push(data.location1)
    locationArray.push(data.location2)
  })
  return Array.from(new Set(locationArray))
}