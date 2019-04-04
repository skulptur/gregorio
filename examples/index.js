const getPages = require('../dist/index')
const en = require('date-fns/locale/en')

const pages = getPages({
  activeMonth: new Date(),
  dateRange: { startDate: null, endDate: null },
  hoverDate: null,
  isRange: false,
  locale: en,
  pageCount: 2,
  setDateRange: () => {},
  setHoverDate: () => {},
})

console.log(pages[0])
