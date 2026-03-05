import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { AppProvider } from './context/AppContext';
import { Root } from './pages/Root';
import { Landing } from './pages/Landing';
import { AuthPage } from './pages/AuthPage';
import { SearchPage } from './pages/SearchPage';
import { ProfessionalProfile } from './pages/ProfessionalProfile';
import { BookingPage } from './pages/BookingPage';
import { UserDashboard } from './pages/UserDashboard';
import { ProfessionalDashboard } from './pages/ProfessionalDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { UserFlowPage } from './pages/UserFlowPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: 'login', element: <AuthPage initialView="login" /> },
      { path: 'registro', element: <AuthPage initialView="register-user" /> },
      { path: 'registro/profesional', element: <AuthPage initialView="register-pro" /> },
      { path: 'buscar', Component: SearchPage },
      { path: 'profesional/:id', Component: ProfessionalProfile },
      { path: 'agendar/:id', Component: BookingPage },
      { path: 'panel/usuario', Component: UserDashboard },
      { path: 'panel/profesional', Component: ProfessionalDashboard },
      { path: 'panel/admin', Component: AdminDashboard },
      { path: 'design-system', Component: DesignSystemPage },
      { path: 'flujo', Component: UserFlowPage },
    ],
  },
]);

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}