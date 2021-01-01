import { WeekDay, WeekStartOffset } from '../types';
import { isNumber, isString } from 'tandris';
import { getDayOffset } from './getDayOffset';

export const castToDayOffset = (weekDay?: WeekDay): WeekStartOffset => {
  if (isNumber(weekDay)) return weekDay as WeekStartOffset;
  if (isString(weekDay)) return getDayOffset(weekDay);

  return 0;
};
