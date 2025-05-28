import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';

import AuthGuard from './AuthGuard';
import { lazyLoad } from './LazyLoad';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    errorElement: <div>Error loading page</div>,
    children: [
      {
        path: 'dashboard',
        element: lazyLoad('dashboard'),
      },
    ],
  },
  {
    path: '/login',
    element: lazyLoad('login'),
  },
  {
    path: '*',
    element: <div>Page not found</div>,
  },
]);

export default routes;
