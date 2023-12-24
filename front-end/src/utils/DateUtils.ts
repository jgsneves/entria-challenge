export const addDaysToCurrentDate = (daysToAdd: number): Date => {
  const currentDate = new Date();
  const newDate = new Date(currentDate);
  newDate.setDate(currentDate.getDate() + daysToAdd);
  return newDate;
};
