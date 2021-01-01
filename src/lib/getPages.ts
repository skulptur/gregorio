import { CalendarPage, Options } from './types';
import { castToDayOffset } from './utils/castToDayOffset';
import { toSameDayRange } from './utils/toRange';
import { getWeek } from './utils/getWeek';
import { getCalendar } from './utils/getCalendar';
import { getRange } from './utils/getRange';
import { getMonthDayMeta } from './utils/getMonthDayMeta';
import { format, addMonths, isSameDay } from 'date-fns';

export function getPages({
  pageCount,
  activeMonth,
  locale,
  weekStartsOn,
  hoverDate,
  minDate,
  maxDate,
  titleFormat,
  weekDayFormat,
  isRange,
  dateRange,
  setDateRange,
  setHoverDate,
  onChange,
}: Options): CalendarPage[] {
  const weekStartOffset = castToDayOffset(weekStartsOn);

  const _dateRange = isRange
    ? dateRange
    : dateRange.startDate
    ? toSameDayRange(dateRange.startDate)
    : { startDate: null, endDate: null };

  return Array.from(Array(pageCount || 1)).map((_page, i) => {
    const month = addMonths(activeMonth, i);

    return {
      header: format(month, titleFormat || 'MMMM yyyy', { locale }),
      month: getCalendar(month, weekStartOffset).map(date => {
        const meta = getMonthDayMeta(date, {
          minDate,
          maxDate,
          month,
          startDate: _dateRange.startDate || undefined,
          endDate: _dateRange.endDate || undefined,
          hoverDate: hoverDate || undefined,
          weekStartsOn: weekStartOffset,
        });

        const day = {
          date,
          ...meta,
          formattedText: format(date, 'd', { locale }),
        };

        return {
          ...day,
          handleDateSelect: () => {
            if (!day.isSelectable) return;
            const range = isRange
              ? getRange(day.date, dateRange.startDate, dateRange.endDate)
              : toSameDayRange(day.date);
            setDateRange(range);
            onChange && onChange(range);
          },
          handleDateHover: () => {
            if (!hoverDate || !isSameDay(day.date, hoverDate)) {
              setHoverDate(day.date);
            }
          },
        };
      }),
      week: getWeek(weekStartsOn || 0).map(day =>
        format(day, weekDayFormat || 'EEEEEE', { locale })
      ),
    };
  });
}
