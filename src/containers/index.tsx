import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import { Login } from './Login';
import { DashboardPage } from './Dashboard';
import { PrivateRoute } from './PrivateRoute';

export const RootRouter: React.FC = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route path='/login' component={Login} />
      <PrivateRoute path='/' component={DashboardPage} />
    </Switch>
  </BrowserRouter>
);