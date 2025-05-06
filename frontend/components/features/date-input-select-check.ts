//only use for transfer Date (if needs to transfer date+time, use "convertDateTimeUTCtoLocal")
export const formattoLocalDate = (date: Date): string => {
  return date.toLocaleDateString("en-CA")
}

export const twoMonthsLater = (day: Date): Date => {
  // Calculate the date two months later
  const twoMonthsLater = new Date(day);
  twoMonthsLater.setMonth(day.getMonth() + 2);
  return twoMonthsLater
}

export const twoDaysLater = (day: Date): Date => {
  // Calculate the date two months later
  const twoDaysLater = new Date(day);
  twoDaysLater.setDate(day.getDate() + 2);
  return twoDaysLater
}


export const getDates = (start: Date, end: Date): Date[] => {
  let current = new Date(start)
  let max = new Date(end)
  const dateGroup: Date[] = []

  while (current <= max) {
    dateGroup.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  return dateGroup
}


//Check student age is at least 16 year old
export const minDriverAge = () => {
  // Get the current date
  const today: Date = new Date();
  const sixteenYearsBefore = new Date();
  // Calculate the year 16 years ago
  sixteenYearsBefore.setFullYear(today.getFullYear() - 16);
  // Format as yyyy-mm-dd
  const sixteenYearsBeforeFormatted = formattoLocalDate(sixteenYearsBefore);
  return sixteenYearsBeforeFormatted
}