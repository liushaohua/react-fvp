import React from 'react';
import { Router, Route } from 'dva/router';

/* eslint react/prop-types:0 */
export default function ({ history, app}) {

  const routes = [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          app.model(require('./models/home'));
          cb(null, require('./routes/HomePage'));
        });
      },
    },
    {
      path: '/users',
      name: 'users',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          app.model(require('./models/users'));
          cb(null, require('./routes/Users'));
        });
      },
    },
    {
      path: '*',
      name: 'notFound',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/NotFound'));
        });
      },
    },
  ];

  return <Router history={ history } routes={ routes } />;
}
