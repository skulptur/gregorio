import * as React from 'react';
import { useEffect } from 'react';
import { Picker } from './Picker';
import { renderPickerContent } from './Picker.template';
import { createApp } from '@muban/muban';

const pages = 2;
const daysPerPage = 42;

export const Gregorio = () => {
  const elementRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    createApp(Picker).mount(elementRef.current);
  }, []);

  // View is rendered in React but without anything dynamic, to simulate a CMS
  return (
    <div ref={elementRef}>
      <div data-component="picker">
        <div className="pages" data-ref="container"></div>
      </div>
    </div>
  );
};
