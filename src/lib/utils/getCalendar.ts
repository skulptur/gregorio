import {
  getDay,
  startOfMonth,
  getDaysInMonth,
  subMonths,
  addMonths,
} from 'date-fns';
import { getMonth } from './getMonth';

// return an array of objects with dates

export const getCalendar = (month: Date, weekStartsOn = 0) => {
  // Get day of the week of the first day of month, eg => 3
  // Add 7 modulo 7 to make sure it's not negative when subtracting weekStartsOn and wraps around
  const firstDay = (7 + getDay(startOfMonth(month)) - weekStartsOn) % 7;
  const thisMonth = getMonth(month);
  const lastMonth = getMonth(
    subMonths(month, 1),
    getDaysInMonth(subMonths(month, 1)) - firstDay
  );
  const nextMonth = getMonth(
    addMonths(month, 1),
    0,
    42 - (thisMonth.length + firstDay)
  );

  return [...lastMonth, ...thisMonth, ...nextMonth];
};
