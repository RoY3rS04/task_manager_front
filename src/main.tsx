import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Pages/Register';
import VerifyAccount from './Pages/VerifyAccount';
import Login from './Pages/Login';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/users/auth/confirm/:token',
    element: <VerifyAccount></VerifyAccount>
  },
  {
    path: '/login',
    element: <Login></Login>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
