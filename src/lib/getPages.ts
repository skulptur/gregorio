import { CalendarPage, Options } from './types';
import { castToDayOffset } from './utils/castToDayOffset';
import { toSameDayRange } from './utils/toRange';
import { getWeek } from './utils/getWeek';
import { getCalendar } from './utils/getCalendar';
import { getRange } from './utils/getRange';
import { getMonthDayMeta } from './utils/getMonthDayMeta';
import { format, addMonths, isSameDay } from 'date-fns';
import { noop } from './utils/noop';

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
}: Options): CalendarPage[] {
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
