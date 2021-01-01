import {
  subMonths,
  addMonths,
  isToday,
  isWeekend,
  isSameMonth,
  isFirstDayOfMonth,
  isLastDayOfMonth,
} from 'date-fns';
import { MonthDayMeta, MonthDayInfo } from '../types';
import { getPickerRange } from './getPickerRange';
import { isWithinSelection } from './isWithinSelection';
import { isDisabled } from './isDisabled';
import { isStartDate } from './isStartDate';
import { isEndDate } from './isEndDate';
import { isPreview } from './isPreview';
import { isFirstDayOfWeek } from './isFirstDayOfWeek';
import { isLastDayOfWeek } from './isLastDayOfWeek';

export const getMonthDayMeta = (
  date: Date,
  {
    startDate,
    endDate,
    hoverDate,
    minDate,
    maxDate,
    month,
    weekStartsOn,
  }: MonthDayInfo
): MonthDayMeta => {
  const range = startDate && getPickerRange(startDate, endDate, hoverDate);
  const isLastMonth = isSameMonth(subMonths(date, 1), month);
  const isNextMonth = isSameMonth(addMonths(date, 1), month);
  const _isDisabled = isDisabled(date, minDate, maxDate);

  return {
    isFirstDayOfWeek: isFirstDayOfWeek(weekStartsOn, date),
    isLastDayOfWeek: isLastDayOfWeek(weekStartsOn, date),
    isFirstDayOfMonth: isFirstDayOfMonth(date),
    isLastDayOfMonth: isLastDayOfMonth(date),
    isToday: isToday(date),
    isWeekend: isWeekend(date),
    isLastMonth,
    isNextMonth,
    isStartDate: Boolean(range && isStartDate(date, range)),
    isEndDate: Boolean(range && isEndDate(date, range)),
    isWithinSelection: isWithinSelection(date, startDate, endDate),
    isPreview: isPreview(date, startDate, endDate, hoverDate),
    isDisabled: _isDisabled,
    isSelectable: !isLastMonth && !isNextMonth && !_isDisabled,
  };
};
