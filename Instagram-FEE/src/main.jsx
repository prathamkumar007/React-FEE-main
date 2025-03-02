import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Profile from './Pages/Profile.jsx'
import Reels from './Pages/Reels.jsx'
import Login from './components/Login.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from './components/SignUp.jsx'

const routes = [
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/reels",
    element: <Reels/>,
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
