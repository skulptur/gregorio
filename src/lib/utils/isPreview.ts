import { isWithinInterval } from 'date-fns';
import { toRange } from './toRange';
import { isStartDate } from './isStartDate';
import { isEndDate } from './isEndDate';

// date is between startDate (exclusive) and hoverDate (inclusive)

export const isPreview = (
  date: Date,
  startDate?: Date,
  endDate?: Date,
  hoverDate?: Date
): boolean => {
  if (!startDate || !hoverDate) return false;

  const previewRange = toRange(startDate, hoverDate);

  return (
    startDate &&
    !endDate &&
    !isStartDate(date, previewRange) &&
    !isEndDate(date, previewRange) &&
    isWithinInterval(date, {
      start: previewRange.startDate,
      end: previewRange.endDate,
    })
  );
};
