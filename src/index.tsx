import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-calendar/dist/Calendar.css';
import 'react-day-picker/lib/style.css';
import './app.css';

import { store } from './config';

import { RootRouter } from './containers';

ReactDOM.render(
  <Provider store={store}>
    <RootRouter />
  </Provider>
, document.getElementById('root'))