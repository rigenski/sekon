import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account';
import Siswa from 'src/views/siswa';
import Guru from 'src/views/guru';
import Dashboard from 'src/views/dashboard';
import Login from 'src/views/auth/Login';
import Kelas from 'src/views/kelas';
import NotFoundView from 'src/views/errors/NotFoundView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'siswa', element: <Siswa /> },
      { path: 'guru', element: <Guru /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'kelas', element: <Kelas /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
