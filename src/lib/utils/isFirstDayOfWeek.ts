import { isSameDay, startOfWeek } from 'date-fns';
import { WeekStartOffset } from '../types';

// NOTE: for performance reasons this could potentially be refactored to use day ids instead of calculating like this

export const isFirstDayOfWeek = (
  weekStartsOn: WeekStartOffset,
  date: Date
): boolean => {
  return isSameDay(startOfWeek(date, { weekStartsOn }), date);
};
