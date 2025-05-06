export function calculateAvailableLessons(totalPaid: number, lessonPrice: number, completedLessons: number) {
  if (lessonPrice <= 0) {
    throw new Error("lessonPrice must be greater than 0");
  }

  const totalPurchased = Math.floor(totalPaid / lessonPrice);
  const availableLessons = totalPurchased - completedLessons;

  return {
    totalPaid,
    lessonPrice,
    totalPurchased,
    completedLessons,
    availableLessons: availableLessons >= 0 ? availableLessons : 0,
  };
}


