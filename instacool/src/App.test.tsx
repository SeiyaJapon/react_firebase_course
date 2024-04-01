import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import { createBrowserHistory } from 'history';
import { identity } from 'lodash';


const history = createBrowserHistory()

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App loadInitialData={identity} history={history} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
