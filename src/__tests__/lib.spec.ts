import en from 'date-fns/locale/en'
import { getPages } from '../'

describe('getPages', () => {
  const pageCount = 2

  const pages = getPages({
    activeMonth: new Date(),
    dateRange: { startDate: null, endDate: null },
    hoverDate: null,
    isRange: false,
    locale: en,
    pageCount,
    setDateRange: () => {
      /* */
    },
    setHoverDate: () => {
      /* */
    },
  })

  it('returns an array of same length as pageCount', () => {
    expect(pages.length).toBe(pageCount)
  })

  it('each page contains a month array with 42 items', () => {
    expect(pages.map((page) => page.month.length)).toEqual(pages.map(() => 42))
  })

  it('every page has a week array with dates for each day of the week', () => {
    expect(pages[0].week).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])
  })

  // TODO:
  // range
  // min / max
  // isRange true/false
})
