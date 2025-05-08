import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Profile from './Pages/Profile.jsx'
import Reels from './Pages/Reels.jsx'
import Login from './components/Login.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from './components/SignUp.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import Settings from './Pages/Settings.jsx'
import UserDiscovery from './Pages/UserDiscovery.jsx'
import PrivateRoute from './components/PrivateRoute'

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/profile/:email",
    element: <Profile />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/reels",
    element: <PrivateRoute><Reels/></PrivateRoute>,
  },
  {
    path: "/discover",
    element: <PrivateRoute><UserDiscovery/></PrivateRoute>,
  },
  {
    path: "/settings",
    element: <PrivateRoute><Settings/></PrivateRoute>,
  },
  {
    path: "/admin",
    element: <PrivateRoute><AdminDashboard/></PrivateRoute>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>
)
