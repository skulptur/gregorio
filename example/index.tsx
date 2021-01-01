import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getPages } from '../dist';
import { enUS } from 'date-fns/locale';
import { addMonths } from 'date-fns';
import cx from 'classnames';

const getClassNames = (day: any) => {
  return cx({
    today: day.isToday,
    weekend: day.isWeekend,
    'start-date': day.isStartDate,
    'end-date': day.isEndDate,
    'within-selection': day.isWithinSelection,
    preview: day.isPreview,
    selectable: !day.isLastMonth && !day.isNextMonth && !day.isDisabled,
    inactive: day.isLastMonth || day.isNextMonth,
    'last-month': day.isLastMonth,
    'next-month': day.isNextMonth,
    disabled: day.isDisabled,
  });
};

const App = () => {
  const [activeMonth, setActiveMonth] = React.useState(new Date());

  const pages = getPages({
    activeMonth,
    dateRange: { startDate: null, endDate: null },
    hoverDate: null,
    isRange: true,
    locale: enUS,
    pageCount: 2,
    setDateRange: () => {},
    setHoverDate: () => {},
  });

  const previousMonth = () => {
    setActiveMonth(addMonths(activeMonth, -1));
  };

  const nextMonth = () => {
    setActiveMonth(addMonths(activeMonth, 1));
  };

  return (
    <div className="pages">
      {pages.map((page, pageId) => {
        return (
          <div key={pageId} className="page">
            <div className="header">
              <div className="nav">
                <div className="previous-button" onClick={previousMonth}></div>
              </div>
              <div className="title">{page.header}</div>
              <div className="nav">
                <div className="next-button" onClick={nextMonth}></div>
              </div>
            </div>

            <div className="days-of-week">
              {page.week.map((day, weekDayId) => {
                return (
                  <div
                    key={`${pageId}-${weekDayId}-${day}`}
                    className="day-of-week"
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            <div className="days-of-month">
              {page.month.map((day, dayId) => {
                return (
                  <div
                    key={`${pageId}-${dayId}-${day.formattedText}`}
                    className={`day-of-month ${getClassNames(day)}`}
                  >
                    {day.formattedText}
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

ReactDOM.render(<App />, document.getElementById('root'));
