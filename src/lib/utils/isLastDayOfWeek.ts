import { isSameDay, endOfWeek } from 'date-fns';
import { WeekStartOffset } from '../types';

// NOTE: could be refactored same as isFirstDayOfWeek

export const isLastDayOfWeek = (
  weekStartsOn: WeekStartOffset,
  date: Date
): boolean => {
  return isSameDay(endOfWeek(date, { weekStartsOn }), date);
};
