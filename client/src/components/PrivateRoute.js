import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import API from '../utils/API';

// module to create private routes
const PrivateRoute = ({component: Component, ...rest}) => {
  return (
      <Route {...rest} render={props => (
        API.isLoggedIn() ?
        <Component {...props} />
        : <Redirect to='/login' />
      )} />
  );
};

export default PrivateRoute;
