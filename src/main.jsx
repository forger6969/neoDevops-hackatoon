import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home.jsx';
import ForFavorites from './Pages/forFavorites.jsx';
import "./language/init.js";
import PetDetails from './Pages/PetDetails.jsx';
import Pets from './Components/Pets.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/favorites",
        element: <ForFavorites />
      },
      {
        path: "/pets/:petId",
        element: <PetDetails />
      },
      {
        path: "/pets",
        element: <Pets />
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
