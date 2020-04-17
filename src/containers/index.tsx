import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import { Login } from './Login';
import { Dashboard } from './Dashboard';
import { PrivateRoute } from './PrivateRoute';

export const RootRouter: React.FC = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route path='/login' component={Login} />
      <PrivateRoute path='/' exact component={Dashboard} />
    </Switch>
  </BrowserRouter>
);