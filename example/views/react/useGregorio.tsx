import * as React from 'react';
import { gregorio, Props } from '../../../dist';
import { enUS } from 'date-fns/locale';

export const useGregorio = () => {
  const [props, setProps] = React.useState<Partial<Props>>({});

  const { pages, ...handlers } = gregorio(
    {
      ...props,
      isRange: true,
      locale: enUS,
      pageCount: 2,
    },
    setProps
  );

  const pagesWithReactPropsGetter = pages.map(page => {
    return {
      ...page,
      days: page.days.map(day => {
        return {
          ...day,
          getDayProps: () => {
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
    ...handlers,
  };
};
