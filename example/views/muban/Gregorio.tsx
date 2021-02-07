import * as React from 'react';
import { useEffect } from 'react';
import { Picker } from './Picker';
import { times } from 'lodash';
import { createApp } from '@muban/muban';

const pages = 2;
const daysPerPage = 42;

export const Gregorio = () => {
  const elementRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    createApp(Picker).mount(elementRef.current.parentElement!);
  }, []);

  // View is rendered in React but without anything dynamic, to simulate a CMS
  return (
    <div ref={elementRef} className="pages" data-component="picker">
      {times(pages, pageId => {
        return (
          <div
            key={pageId}
            data-component="page"
            data-ref="page"
            className="page"
          >
            <div className="header">
              <div className="nav">
                <div
                  className="previous-button"
                  data-ref="previousButton"
                ></div>
              </div>
              <div className="title" data-ref="title">
                title placeholder
              </div>
              <div className="nav">
                <div className="next-button" data-ref="nextButton"></div>
              </div>
            </div>

            <div className="days-of-week">
              {times(7, weekDayId => {
                return (
                  <div
                    key={weekDayId}
                    className="day-of-week"
                    data-ref="weekDayLabel"
                  >
                    {weekDayId}
                  </div>
                );
              })}
            </div>
            <div className="days-of-month">
              {times(daysPerPage, pageDayId => {
                return (
                  <div
                    key={pageDayId}
                    className={`day-of-month`}
                    data-ref="day"
                  >
                    {pageDayId}
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
