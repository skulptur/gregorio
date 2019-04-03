import {
  addDays,
  isBefore,
  startOfWeek,
  getDay,
  startOfMonth,
  getDaysInMonth,
  subMonths,
  addMonths,
  startOfDay,
  endOfDay,
} from 'date-fns'
import { NullableDate, DayName, WeekDay, DateRange } from './interfaces'
import { isNumber, isString } from 'tandris'

const tuple = <T extends string[]>(...args: T) => args

export const daysOfWeek = tuple(
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
)

// calculates offset from sunday, eg monday is +1
export const dayOffset = (dayName: DayName) => {
  return daysOfWeek.indexOf(dayName.toLowerCase())
}

export const castToDayOffset = (weekDay?: WeekDay) => {
  if (isNumber(weekDay)) return weekDay
  if (isString(weekDay)) return dayOffset(weekDay)

  return 0
}

// creates a date range object and automatically swaps startDate and endDate if endDate is before startDate
// also remove time information, setting startOfDay to startDate and endOfDay to endDate
export const toRange = (startDate: Date, endDate: Date): DateRange => {
  let _startDate = startDate
  let _endDate = endDate
  if (isBefore(_endDate, _startDate)) {
    ;[_startDate, _endDate] = [_endDate, _startDate]
  }

  return { startDate: startOfDay(_startDate), endDate: endOfDay(_endDate) }
}

export const toSameDayRange = (date: Date): DateRange => {
  return toRange(date, date)
}

// returns an array of dates for each day of the current week
export const getWeek = (weekStartsOn: WeekDay) => {
  const startDay = startOfWeek(new Date(), { weekStartsOn: castToDayOffset(weekStartsOn) })

  return [...Array(7)].map((_value, i) => addDays(startDay, i))
}

// returns an array of dates of the month, optionally skip x number of days
export const getMonth = (month: Date, skip = 0, limit = 0) => {
  const startDay = startOfMonth(month)
  let size = getDaysInMonth(month) - skip
  size = Math.min(Math.max(size, 0), limit || size)
  size = size < 0 ? 0 : size

  return [...Array(size)].map((value, i) => addDays(startDay, i + skip))
}

// return an array of objects with dates
export const getCalendar = (month: Date, weekStartsOn = 0) => {
  // Get day of the week of the first day of month, eg => 3
  // Add 7 modulo 7 to make sure it's not negative when subtracting weekStartsOn and wraps around
  const firstDay = (7 + getDay(startOfMonth(month)) - weekStartsOn) % 7
  const thisMonth = getMonth(month)
  const lastMonth = getMonth(subMonths(month, 1), getDaysInMonth(subMonths(month, 1)) - firstDay)
  const nextMonth = getMonth(addMonths(month, 1), 0, 42 - (thisMonth.length + firstDay))

  return [...lastMonth, ...thisMonth, ...nextMonth]
}

// used to get a valid range based on user input
export const getRange = (date: Date, startDate: NullableDate, endDate: NullableDate) => {
  if (!startDate || (startDate && endDate)) {
    // user is selecting startDate
    return {
      startDate: startOfDay(date),
      endDate: null,
    }
  } else {
    // user is selecting endDate
    return toRange(startDate, date)
  }
}
