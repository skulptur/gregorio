import { isBefore, startOfDay, endOfDay } from 'date-fns';
import { DateRange } from '../types';

// creates a date range object and automatically swaps startDate and endDate if endDate is before startDate
// also remove time information, setting startOfDay to startDate and endOfDay to endDate

export const toRange = (startDate: Date, endDate: Date): DateRange => {
  let _startDate = startDate;
  let _endDate = endDate;
  if (isBefore(_endDate, _startDate)) {
    [_startDate, _endDate] = [_endDate, _startDate];
  }

  return { startDate: startOfDay(_startDate), endDate: endOfDay(_endDate) };
};

export const toSameDayRange = (date: Date): DateRange => {
  return toRange(date, date);
};
