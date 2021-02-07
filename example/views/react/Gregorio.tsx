import * as React from 'react';
import { getDayClassNames } from '../utils/getDayClassNames';
import { useGregorio } from './useGregorio';

export const Gregorio = () => {
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
                    className={`day-of-month ${getDayClassNames(pageDay)}`}
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
