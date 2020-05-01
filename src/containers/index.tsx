import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import { Login } from './Login';
import { DashboardPage } from './DashboardPage';
import { PrivateRoute } from './PrivateRoute';
import { SetupPage } from './SetupPage';

export const RootRouter: React.FC = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path="/">
        <PrivateRoute path='/setup' component={SetupPage} />
        <PrivateRoute path='/' exact component={DashboardPage} />
      </Route>
    </Switch>
  </BrowserRouter>
);