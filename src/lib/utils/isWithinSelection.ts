import { isWithinInterval } from 'date-fns';
import { NullableDate } from '../types';
import { toRange } from './toRange';

// is date between selection range

export const isWithinSelection = (
  date: Date,
  startDate: NullableDate,
  endDate: NullableDate
): boolean => {
  if (!(startDate && endDate)) return false;

  const range = toRange(startDate, endDate);

  return isWithinInterval(date, { start: range.startDate, end: range.endDate });
};
