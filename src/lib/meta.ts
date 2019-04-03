import {
  subMonths,
  addMonths,
  isWithinRange,
  isAfter,
  isBefore,
  isSameDay,
  subDays,
  isToday,
  isWeekend,
  isSameMonth,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  startOfWeek,
  endOfWeek,
} from 'date-fns'
import { toRange } from './utils'
import { CalendarDayMeta, CalendarDayInfo, DateRange } from './interfaces'

// returns startDate and endDate if both dates are defined
// otherwise uses the startDate and hoverDate
// unless user hasn't hovered, then use start date twice
const getRange = (startDate: Date, endDate?: Date, hoverDate?: Date) => {
  if (startDate && endDate) return toRange(startDate, endDate)
  if (startDate && hoverDate) return toRange(startDate, hoverDate)

  return toRange(startDate, startDate)
}

// date is between selection range
const isWithinSelection = (date: Date, startDate?: Date, endDate?: Date): boolean => {
  if (!(startDate && endDate)) return false

  const range = toRange(startDate, endDate)

  return isWithinRange(date, range.startDate, range.endDate)
}

// date is before minDate or after maxDate
const isDisabled = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
  const isBeforeMinDate = minDate && isBefore(date, subDays(minDate, 1))
  const isAfterMaxDate = maxDate && isAfter(date, maxDate)

  return Boolean(isBeforeMinDate || isAfterMaxDate)
}

// date selected is start date
const isStartDate = (date: Date, range: DateRange): boolean => {
  return range.startDate && isSameDay(date, range.startDate)
}

// date selected is end date
const isEndDate = (date: Date, range: DateRange): boolean => {
  return range.endDate && isSameDay(date, range.endDate)
}

// date is between startDate (exclusive) and hoverDate (inclusive)
const isPreview = (date: Date, startDate?: Date, endDate?: Date, hoverDate?: Date): boolean => {
  if (!startDate || !hoverDate) return false

  const previewRange = toRange(startDate, hoverDate)

  return (
    startDate &&
    !endDate &&
    !isStartDate(date, previewRange) &&
    !isEndDate(date, previewRange) &&
    isWithinRange(date, previewRange.startDate, previewRange.endDate)
  )
}

// NOTE: for performance reasons this could potentially be refactored to use day ids instead of calculating like this
const isFirstDayOfWeek = (weekStartsOn: number, date: Date): boolean => {
  return isSameDay(startOfWeek(date, { weekStartsOn }), date)
}

// NOTE: could be refactored same as isFirstDayOfWeek
const isLastDayOfWeek = (weekStartsOn: number, date: Date): boolean => {
  return isSameDay(endOfWeek(date, { weekStartsOn }), date)
}

export const getCalendarDayMeta = (
  date: Date,
  { startDate, endDate, hoverDate, minDate, maxDate, month, weekStartsOn }: CalendarDayInfo
): CalendarDayMeta => {
  const range = startDate && getRange(startDate, endDate, hoverDate)
  const isLastMonth = isSameMonth(subMonths(date, 1), month)
  const isNextMonth = isSameMonth(addMonths(date, 1), month)
  const _isDisabled = isDisabled(date, minDate, maxDate)

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
  }
}
