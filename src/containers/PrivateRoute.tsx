import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const checkAuth = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  return true;
}

export const PrivateRoute: React.ComponentType<any> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        checkAuth() ? (
          <Component {...props}  />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              }
            }}
          />
        )
      }
    />
  );
};