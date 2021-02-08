import { Day } from '../../../dist';

export const getDayClassNames = (day: Day) => {
  return {
    today: day.isToday,
    weekend: day.isWeekend,
    'start-date': day.isStartDate,
    'end-date': day.isEndDate,
    'within-selection': day.isWithinSelection,
    preview: day.isPreview,
    selectable: day.isSelectable,
    inactive: day.isLastMonth || day.isNextMonth,
    'last-month': day.isLastMonth,
    'next-month': day.isNextMonth,
    disabled: day.isDisabled,
  };
};
