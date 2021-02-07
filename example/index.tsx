import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getPages, NullableDateRange, MonthDay } from '../dist';
import { enUS } from 'date-fns/locale';
import { addMonths } from 'date-fns';
import cx from 'classnames';

const useGregorio = () => {
  const [activeMonth, setActiveMonth] = React.useState(new Date());
  const [hoverDate, setHoverDate] = React.useState<Date | null>(null);
  const [dateRange, setDateRange] = React.useState<NullableDateRange>({
    startDate: null,
    endDate: null,
  });

  const pages = getPages({
    activeMonth,
    dateRange,
    setDateRange,
    hoverDate,
    setHoverDate,
    isRange: true,
    locale: enUS,
    pageCount: 2,
  });

  const previousMonth = () => {
    setActiveMonth(addMonths(activeMonth, -1));
  };

  const nextMonth = () => {
    setActiveMonth(addMonths(activeMonth, 1));
  };

  const pagesWithReactPropsGetter = pages.map(page => {
    return {
      ...page,
      days: page.days.map(day => {
        return {
          ...day,
          getDayProps: () => {
            // TODO: add key, or even add it on the lib itself
            return {
              onClick: () => {
                day.select();
              },
              onMouseOver: () => {
                day.hover();
              },
            };
          },
        };
      }),
    };
  });

  return {
    pages: pagesWithReactPropsGetter,
    previousMonth,
    nextMonth,
  };
};

const App = () => {
  const { pages, previousMonth, nextMonth } = useGregorio();

  return (
    <div className="pages">
      {pages.map((page, pageId) => {
        return (
          <div key={pageId} className="page">
            <div className="header">
              <div className="nav">
                <div className="previous-button" onClick={previousMonth}></div>
              </div>
              <div className="title">{page.title}</div>
              <div className="nav">
                <div className="next-button" onClick={nextMonth}></div>
              </div>
            </div>

            <div className="days-of-week">
              {page.weekLabels.map(weekDayLabel => {
                return (
                  <div key={weekDayLabel} className="day-of-week">
                    {weekDayLabel}
                  </div>
                );
              })}
            </div>
            <div className="days-of-month">
              {page.days.map(pageDay => {
                return (
                  <div
                    key={pageDay.date.toString()}
                    className={`day-of-month ${getClassNames(pageDay)}`}
                    {...pageDay.getDayProps()}
                  >
                    {pageDay.formattedText}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const getClassNames = (day: MonthDay) => {
  return cx({
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
  });
};

ReactDOM.render(<App />, document.getElementById('root'));
