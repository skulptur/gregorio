import { NullableDate } from '../types';
import { toRange } from './toRange';

// returns startDate and endDate if both dates are defined
// otherwise uses the startDate and hoverDate
// unless user hasn't hovered, then use start date twice
export const getPickerRange = (
  startDate: Date,
  endDate: NullableDate,
  hoverDate: NullableDate
) => {
  if (startDate && endDate) return toRange(startDate, endDate);
  if (startDate && hoverDate) return toRange(startDate, hoverDate);

  return toRange(startDate, startDate);
};
