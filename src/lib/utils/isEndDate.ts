import { isSameDay } from 'date-fns';
import { DateRange } from '../types';

// date selected is end date

export const isEndDate = (date: Date, range: DateRange): boolean => {
  return range.endDate && isSameDay(date, range.endDate);
};
