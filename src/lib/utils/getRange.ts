import { startOfDay } from 'date-fns';
import { NullableDate } from '../types';
import { toRange } from './toRange';

// used to get a valid range based on user input

export const getRange = (
  date: Date,
  startDate: NullableDate,
  endDate: NullableDate
) => {
  if (!startDate || (startDate && endDate)) {
    // user is selecting startDate
    return {
      startDate: startOfDay(date),
      endDate: null,
    };
  } else {
    // user is selecting endDate
    return toRange(startDate, date);
  }
};
