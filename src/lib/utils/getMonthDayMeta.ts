import {
  subMonths,
  addMonths,
  isToday,
  isWeekend,
  isSameMonth,
  isFirstDayOfMonth,
  isLastDayOfMonth,
} from 'date-fns';
import { NullableDate, WeekStartOffset } from '../types';
import { getPickerRange } from './getPickerRange';
import { isWithinSelection } from './isWithinSelection';
import { isDisabled } from './isDisabled';
import { isStartDate } from './isStartDate';
import { isEndDate } from './isEndDate';
import { isPreview } from './isPreview';
import { isFirstDayOfWeek } from './isFirstDayOfWeek';
import { isLastDayOfWeek } from './isLastDayOfWeek';

export type DayMeta = {
  isFirstDayOfWeek: boolean;
  isLastDayOfWeek: boolean;
  isFirstDayOfMonth: boolean;
  isLastDayOfMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isLastMonth: boolean;
  isNextMonth: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isWithinSelection: boolean;
  isPreview: boolean;
  isDisabled: boolean;
  isSelectable: boolean;
};

type GetMonthDayMetaProps = {
  month: Date;
  weekStartsOn: WeekStartOffset;
  startDate: NullableDate;
  endDate: NullableDate;
  hoverDate: NullableDate;
  minDate?: Date;
  maxDate?: Date;
};

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
  }: GetMonthDayMetaProps
): DayMeta => {
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
