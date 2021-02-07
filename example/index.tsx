import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Gregorio as GregorioReact } from './views/react/Gregorio';
import { Gregorio as GregorioMuban } from './views/muban/Gregorio';

const App = () => {
  return (
    <div>
      <GregorioReact></GregorioReact>
      <GregorioMuban></GregorioMuban>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
