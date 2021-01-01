import { DayName, WeekStartOffset } from '../types';
import { daysOfWeek } from '../daysOfWeek';

// calculates offset from sunday, eg monday is +1

export const getDayOffset = (dayName: DayName): WeekStartOffset => {
  return daysOfWeek.indexOf(dayName) as WeekStartOffset;
};
