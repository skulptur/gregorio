import { html } from '@muban/muban';
import { CalendarPage } from '../../../dist/lib/getPages';
import { renderPage } from './Page.template';

interface RenderPickerProps {
  pages: Array<CalendarPage>;
}

export const renderPickerContent = ({ pages }: RenderPickerProps) => {
  console.log('renderPickerContent', pages);
  return html`
    ${pages.map(page => {
      return renderPage({ page });
    })}
  `;
};
