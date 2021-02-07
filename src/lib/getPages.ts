import { Props } from './gregorio';
import { getWeek } from './utils/getWeek';
import { getCalendar } from './utils/getCalendar';
import { getRange } from './utils/getRange';
import { getMonthDayMeta, DayMeta } from './utils/getMonthDayMeta';
import { format, addMonths, isSameDay } from 'date-fns';
import { toSameDayRange } from './utils/toRange';
import { castToDayOffset } from './utils/castToDayOffset';

export type Day = DayMeta & {
  date: Date;
  formattedText: string;
  select: () => void;
  hover: () => void;
};

export type CalendarPage = {
  days: Day[];
  weekLabels: string[];
  title: string;
};

export const getPages = (
  props: Props,
  onChange: (props: Partial<Props>) => void
): CalendarPage[] => {
  const {
    pageCount,
    titleFormat,
    weekDayFormat,
    locale,
    hoverDate,
    minDate,
    maxDate,
    weekStartsOn,
    isRange,
    dateRange,
    activeMonth,
  } = props;

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

            onChange({
              ...props,
              dateRange: range,
            });
          },

          hover: () => {
            if (!hoverDate || !isSameDay(day.date, hoverDate)) {
              onChange({
                ...props,
                hoverDate: day.date,
              });
            }
          },
        };
      }),
      weekLabels: getWeek(weekStartsOn).map(day =>
        format(day, weekDayFormat, { locale })
      ),
    };
  });
};
