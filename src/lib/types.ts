import { daysOfWeek } from './daysOfWeek';

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
