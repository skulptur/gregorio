import {
  addDays,
  addMonths,
  getDaysInMonth,
  isSameDay,
  isBefore,
} from 'date-fns';
import {
  daysOfWeek,
  toRange,
  dayOffset,
  getWeek,
  getMonth,
  getCalendar,
} from '../lib/utils';

const testDate = new Date(2000, 0); // use an arbitrary date
const nOfMonths = 12 * 4; // test methods for this many months

describe('toRange', () => {
  const startDate = new Date();
  const endDate = addDays(new Date(), 2);
  it('returns a date range object, ignoring time information', () => {
    const range = toRange(startDate, endDate);
    expect(
      isSameDay(range.startDate, startDate) && isSameDay(range.endDate, endDate)
    ).toBe(true);
  });
  it('automatically swaps start and end date if needed', () => {
    const range = toRange(endDate, startDate);
    expect(isBefore(range.startDate, range.endDate)).toBe(true);
  });
});

describe('dayOffset', () => {
  it('returns the correct offset', () => {
    for (let i = 0; i < daysOfWeek.length - 1; i++) {
      expect(dayOffset(daysOfWeek[i])).toBe(i);
    }
  });
});

describe('getWeek', () => {
  it('returns an array of length 7', () => {
    daysOfWeek.forEach(day => {
      expect(getWeek(day)).toHaveLength(7);
    });
  });
});

describe('getMonth', () => {
  it('returns an array with length of days in a given month', () => {
    for (let i = 0; i < nOfMonths; i++) {
      const date = addMonths(testDate, i);
      expect(getMonth(date)).toHaveLength(getDaysInMonth(date));
    }
  });

  it('skips x days from the start and limits to a set maximum number of days', () => {
    for (let i = 0; i < nOfMonths; i++) {
      const date = addMonths(testDate, i);
      const daysInMonth = getDaysInMonth(date);
      const skip = i % daysInMonth;
      const limit = (i % 30) + 1;
      expect(getMonth(date, skip)).toHaveLength(daysInMonth - skip);
      expect(getMonth(date, 0, limit)).toHaveLength(limit);
      expect(getMonth(date, skip, limit)).toHaveLength(
        Math.min(limit, daysInMonth - skip)
      );
    }
  });
});

describe('getCalendar', () => {
  it('always returns an array of length 42', () => {
    for (let i = 0; i < nOfMonths; i++) {
      const date = addMonths(testDate, i);
      const dayOffset = i % 7;
      expect(getCalendar(date)).toHaveLength(42);
      expect(getCalendar(date, dayOffset)).toHaveLength(42);
    }
  });
});
