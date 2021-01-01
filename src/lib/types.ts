import { daysOfWeek } from './daysOfWeek';
import { Locale } from 'date-fns';

export type WeekStartOffset = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type Nullable<T> = T | null;

export type NullableDate = Nullable<Date>;

export type DayName = typeof daysOfWeek[number];

export type WeekDay = DayName | number;

export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export type NullableDateRange = {
  startDate: NullableDate;
  endDate: NullableDate;
};

export type MonthDayMeta = {
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

export type MonthDay = MonthDayMeta & {
  date: Date;
  formattedText: string;
  select: () => void;
  hover: () => void;
};

export type MonthDayInfo = {
  month: Date;
  weekStartsOn: WeekStartOffset;
  startDate: NullableDate;
  endDate: NullableDate;
  hoverDate: NullableDate;
  minDate?: Date;
  maxDate?: Date;
};

export type CalendarPage = {
  month: MonthDay[];
  week: string[];
  header: string;
};

export type Options = {
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
