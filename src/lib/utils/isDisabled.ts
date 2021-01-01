import { isAfter, isBefore, subDays } from 'date-fns';

// is date before minDate or after maxDate
export const isDisabled = (
  date: Date,
  minDate?: Date,
  maxDate?: Date
): boolean => {
  const isBeforeMinDate = minDate && isBefore(date, subDays(minDate, 1));
  const isAfterMaxDate = maxDate && isAfter(date, maxDate);

  return Boolean(isBeforeMinDate || isAfterMaxDate);
};
