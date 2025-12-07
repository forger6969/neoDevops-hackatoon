import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RizoHeader from "./Components/Rizoheader.jsx";
import Home from "./Pages/Home.jsx";
import Topiboldim from "./Pages/Topiboldim.jsx";
import Yoqotibqoydim from "./Pages/Yoqotibqoydim.jsx";
import ForFavorites from './Pages/forFavorites.jsx';
import Auth from "./Pages/Auth.jsx";  // ⬅️ 1. BU QATORNI QO'SHING
import "./language/init.js";
import PetDetails from './Pages/PetDetails.jsx';
import Pets from './Components/Pets.jsx';
import ProfilePage from "./Pages/ProfilePage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RizoHeader />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/topiboldim",
        element: <Topiboldim />,
      },
      {
        path: "/yoqotibqoydim",
        element: <Yoqotibqoydim />,
      },
      {
        path: "/favorites",
        element: <ForFavorites />
      },
      {
        path: "/auth",  // ⬅️ 2. BU QISMNI QO'SHING
        element: <Auth />,
      },
      {
        path: "/pets/:petId",
        element: <PetDetails />
      },
      {
        path: "/pets",
        element: <Pets />
      }, {
        path: "/profile",
        element: <ProfilePage />
      }
    ],

  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);