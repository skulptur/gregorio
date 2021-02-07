import { NullableDate, NullableDateRange, WeekDay } from './types';
import { addMonths } from 'date-fns';
import { CalendarPage, getPages } from './getPages';

export type Props = {
  activeMonth: Date;
  dateRange: NullableDateRange;
  hoverDate: NullableDate;
  isRange: boolean;
  locale?: Locale;
  maxDate?: Date;
  minDate?: Date;
  pageCount: number;
  titleFormat: string;
  weekDayFormat: string;
  weekStartsOn: WeekDay;
};

const getDefaultProps = (props: Partial<Props>): Props => {
  return {
    pageCount: 1,
    weekStartsOn: 0,
    titleFormat: 'MMMM yyyy',
    weekDayFormat: 'eeeeee',
    activeMonth: new Date(),
    hoverDate: null,
    isRange: true,
    dateRange: {
      startDate: null,
      endDate: null,
    },
    ...props,
  };
};

type Gregorio = {
  pages: CalendarPage[];
  previousMonth: () => void;
  nextMonth: () => void;
};

export function gregorio(
  props: Partial<Props>,
  onChange: (props: Partial<Props>) => void
): Gregorio {
  const propsWithDefaults = getDefaultProps(props);

  return {
    previousMonth: () => {
      onChange({
        ...propsWithDefaults,
        activeMonth: addMonths(propsWithDefaults.activeMonth, -1),
      });
    },
    nextMonth: () => {
      onChange({
        ...propsWithDefaults,
        activeMonth: addMonths(propsWithDefaults.activeMonth, 1),
      });
    },
    pages: getPages(propsWithDefaults, onChange),
  };
}
