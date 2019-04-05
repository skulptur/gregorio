import { daysOfWeek } from './utils'

type Nullable<T> = T | null

export type NullableDate = Nullable<Date>

export type DayName = typeof daysOfWeek[number]

export type WeekDay = DayName | number

export interface DateRange {
  startDate: Date
  endDate: Date
}

export interface NullableDateRange {
  startDate: Date | null
  endDate: Date | null
}

export interface CalendarDayMeta {
  isFirstDayOfWeek: boolean
  isLastDayOfWeek: boolean
  isFirstDayOfMonth: boolean
  isLastDayOfMonth: boolean
  isToday: boolean
  isWeekend: boolean
  isLastMonth: boolean
  isNextMonth: boolean
  isStartDate: boolean
  isEndDate: boolean
  isWithinSelection: boolean
  isPreview: boolean
  isDisabled: boolean
  isSelectable: boolean
}

export interface CalendarDay extends CalendarDayMeta {
  date: Date
  formattedText: string
  handleDateSelect: () => void
  handleDateHover: () => void
}

export interface CalendarDayInfo {
  month: Date
  weekStartsOn: number
  startDate?: Date
  endDate?: Date
  hoverDate?: Date
  minDate?: Date
  maxDate?: Date
}

export interface CalendarPage {
  month: CalendarDay[]
  week: string[]
  header: string
}

export interface Options {
  activeMonth: Date
  dateRange: NullableDateRange
  hoverDate: Date | null
  isRange: boolean
  locale: {}
  maxDate?: Date
  minDate?: Date
  onChange?: (change: NullableDateRange | Date) => void
  pageCount?: number
  setDateRange: (change: NullableDateRange) => void
  setHoverDate: (date: Date) => void
  titleFormat?: string
  weekDayFormat?: string
  weekStartsOn?: WeekDay
}
