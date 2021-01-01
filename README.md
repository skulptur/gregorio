# Gregorio

Pure and framework agnostic Typescript library for creating date pickers and calendars.

```typescript
import { getPages } from 'gregorio';
import { enUS } from 'date-fns/locale';

// gives you the data for rendering and handles a lot of the logic for you
const pages = getPages({
  activeMonth: new Date(),
  dateRange: { startDate: null, endDate: null },
  hoverDate: null,
  locale: enUS,
  pageCount: 2,
});

console.log(pages[0]);
```
