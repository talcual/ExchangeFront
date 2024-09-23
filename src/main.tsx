import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'font-awesome/css/font-awesome.min.css';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import './App.css'
import App from './App'
import IndexLogin from './pages/login'
import HistorialIndex from './pages/historial';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/historial",
    element: <HistorialIndex />,
  },
  {
    path: "/login",
    element: <IndexLogin />,
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
