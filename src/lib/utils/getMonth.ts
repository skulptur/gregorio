import { addDays, startOfMonth, getDaysInMonth } from 'date-fns';

// returns an array of dates of the month, optionally skip x number of days

export const getMonth = (month: Date, skip = 0, limit = 0) => {
  const startDay = startOfMonth(month);
  let size = getDaysInMonth(month) - skip;
  size = Math.min(Math.max(size, 0), limit || size);
  size = size < 0 ? 0 : size;

  return Array.from(Array(size)).map((_value, i) =>
    addDays(startDay, i + skip)
  );
};
