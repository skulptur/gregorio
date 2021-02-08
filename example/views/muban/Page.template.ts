import { html } from '@muban/muban';
import { CalendarPage } from '../../../dist/lib/getPages';

interface RenderPageProps {
  page: CalendarPage;
}

export const renderPage = ({ page }: RenderPageProps) => {
  return html`
    <div data-component="page" data-ref="page" className="page">
      <div className="header">
        <div className="nav">
          <div className="previous-button" data-ref="previousButton"></div>
        </div>
        <div className="title" data-ref="title">
          ${page.title}
        </div>
        <div className="nav">
          <div className="next-button" data-ref="nextButton"></div>
        </div>
      </div>

      <div className="days-of-week">
        ${page.weekLabels.map(weekDayLabel => {
          return html`
            <div
              key=${weekDayLabel}
              className="day-of-week"
              data-ref="weekDayLabel"
            >
              ${weekDayLabel}
            </div>
          `;
        })}
      </div>
      <div className="days-of-month">
        ${page.days.map(day => {
          return html`
            <div className="day-of-month" data-ref="day">
              ${day.formattedText}
            </div>
          `;
        })}
      </div>
    </div>
  `;
};
