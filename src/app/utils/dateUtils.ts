export const formatDateToMMDDYYYYFormat = (date?: Date) => {
  return date
    ? date.toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);
};
