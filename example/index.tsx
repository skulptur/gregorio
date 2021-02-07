import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Gregorio } from './views/react/Gregorio';

const App = () => {
  return (
    <div>
      <Gregorio></Gregorio>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
