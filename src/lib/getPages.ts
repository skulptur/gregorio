import { NullableDate, NullableDateRange, WeekDay } from './types';
import { castToDayOffset } from './utils/castToDayOffset';
import { toSameDayRange } from './utils/toRange';
import { getWeek } from './utils/getWeek';
import { getCalendar } from './utils/getCalendar';
import { getRange } from './utils/getRange';
import { getMonthDayMeta, DayMeta } from './utils/getMonthDayMeta';
import { format, addMonths, isSameDay } from 'date-fns';
import { noop } from './utils/noop';

export type GetPagesProps = {
  activeMonth: Date;
  dateRange: NullableDateRange;
  hoverDate: NullableDate;
  isRange: boolean;
  locale?: Locale;
  maxDate?: Date;
  minDate?: Date;
  onChange?: (change: NullableDateRange | Date) => void;
  pageCount?: number;
  setDateRange: (change: NullableDateRange) => void;
  setHoverDate: (date: Date) => void;
  titleFormat?: string;
  weekDayFormat?: string;
  weekStartsOn?: WeekDay;
};

export type CalendarPage = {
  days: Day[];
  weekLabels: string[];
  title: string;
};

export type Day = DayMeta & {
  date: Date;
  formattedText: string;
  select: () => void;
  hover: () => void;
};

// TODO: add state and setState to the props
// TODO: instead of CalendarPage[] it would be better to return the page switch handlers already
export function getPages({
  pageCount = 1,
  weekStartsOn = 0,
  titleFormat = 'MMMM yyyy',
  weekDayFormat = 'eeeeee',
  activeMonth,
  locale,
  hoverDate,
  minDate,
  maxDate,
  isRange,
  dateRange,
  setDateRange,
  setHoverDate,
  onChange = noop,
}: GetPagesProps): CalendarPage[] {
  const weekStartOffset = castToDayOffset(weekStartsOn);

  const _dateRange = isRange
    ? dateRange
    : dateRange.startDate
    ? toSameDayRange(dateRange.startDate)
    : { startDate: null, endDate: null };

  return Array.from(Array(pageCount)).map((_page, i) => {
    const month = addMonths(activeMonth, i);

    return {
      title: format(month, titleFormat, { locale }),
      days: getCalendar(month, weekStartOffset).map(date => {
        const meta = getMonthDayMeta(date, {
          minDate,
          maxDate,
          month,
          startDate: _dateRange.startDate,
          endDate: _dateRange.endDate,
          hoverDate: hoverDate,
          weekStartsOn: weekStartOffset,
        });

        const day = {
          date,
          ...meta,
          formattedText: format(date, 'd', { locale }),
        };

        return {
          ...day,
          select: () => {
            if (!day.isSelectable) return;

            const range = isRange
              ? getRange(day.date, dateRange.startDate, dateRange.endDate)
              : toSameDayRange(day.date);
            setDateRange(range);
            onChange(range);
          },

          hover: () => {
            if (!hoverDate || !isSameDay(day.date, hoverDate)) {
              setHoverDate(day.date);
            }
          },
        };
      }),
      weekLabels: getWeek(weekStartsOn).map(day =>
        format(day, weekDayFormat, { locale })
      ),
    };
  });
}
