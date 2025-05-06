//["Burnaby", "Vancouver"] & ["Vancouver", "Burnaby"] → "Burnaby-Vancouver"
export const getLocationKey = (itemData: { location1: string, location2: string }): string => {
  return [itemData.location1, itemData.location2].sort().join("-")
}

// "north vancouver" -> ["North","Vancouver"]
export const formatLocation = (input: string): string[] => {
  const result = input.trim().split(/\s+/).map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  )
  console.log("result", result)
  return result
}

//remove space in a string
export const removeSpace = (input: string): string => {
  return input.replace(/\s+/g, "");
};