import { isWithinInterval } from 'date-fns';
import { toRange } from './toRange';

// date is between selection range

export const isWithinSelection = (
  date: Date,
  startDate?: Date,
  endDate?: Date
): boolean => {
  if (!(startDate && endDate)) return false;

  const range = toRange(startDate, endDate);

  return isWithinInterval(date, { start: range.startDate, end: range.endDate });
};
