import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getPages } from '../dist';
import { enUS } from 'date-fns/locale';

const pages = getPages({
  activeMonth: new Date(),
  dateRange: { startDate: null, endDate: null },
  hoverDate: null,
  isRange: false,
  locale: enUS,
  pageCount: 2,
  setDateRange: () => {},
  setHoverDate: () => {},
});

console.log(pages[0]);

const App = () => {
  return <div>hello world</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
