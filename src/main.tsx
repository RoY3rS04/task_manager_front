import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Pages/Register';
import VerifyAccount from './Pages/VerifyAccount';
import Login from './Pages/Login';
import { UserProvider } from './context/userProvider';
import Protected from './Pages/Protected';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Team from './Pages/Team';
import CreateTeam from './Pages/CreateTeam';
import CreateTask from './Pages/CreateTask';
import Tasks from './Pages/Tasks';
import EditTask from './Pages/EditTask';

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
  },
  {
    path: '/',
    element: <Protected></Protected>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/profile',
        element: <Profile></Profile>
      },
      {
        path: '/team',
        element: <Team></Team>
      },
      {
        path: '/team/create',
        element: <CreateTeam></CreateTeam>
      },
      {
        path: '/tasks/create',
        element: <CreateTask></CreateTask>
      },
      {
        path: '/tasks',
        element: <Tasks></Tasks>
      },
      {
        path: '/task/:id',
        element: <EditTask></EditTask>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserProvider>
  </React.StrictMode>,
)
