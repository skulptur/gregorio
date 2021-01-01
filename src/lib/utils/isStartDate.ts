import { isSameDay } from 'date-fns';
import { DateRange } from '../types';

// date selected is start date

export const isStartDate = (date: Date, range: DateRange): boolean => {
  return range.startDate && isSameDay(date, range.startDate);
};
