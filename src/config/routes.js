import { lazy } from 'react';

import withSuspense from 'helpers/withSuspense';

const routes = [
  {
    path: '/',
    component: withSuspense(lazy(() => import('pages/home'))),
  },
  {
    path: '/user-profile',
    component: withSuspense(lazy(() => import('pages/userProfile'))),
    subRoutes: [
      {
        path: ':id',
        component: withSuspense(lazy(() => import('pages/userProfile'))),
      },
    ],
  },
  {
    path: '*',
    component: withSuspense(lazy(() => import('pages/notFound'))),
  },
];

export default routes;
