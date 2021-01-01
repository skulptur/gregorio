import { addDays, startOfWeek } from 'date-fns';
import { WeekDay } from '../types';
import { castToDayOffset } from './castToDayOffset';

// returns an array of dates for each day of the current week

export const getWeek = (weekStartsOn: WeekDay) => {
  const startDay = startOfWeek(new Date(), {
    weekStartsOn: castToDayOffset(weekStartsOn),
  });

  return Array.from(Array(7)).map((_value, i) => addDays(startDay, i));
};
