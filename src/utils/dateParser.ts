export const convertToDateString = (date: string): string =>
  new Date(date).toDateString();

export const formatDateToCompactString = (date: string): string =>
  new Date(date).toISOString().split('T')[0];
