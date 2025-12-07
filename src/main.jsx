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
import "./language/init.js";

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
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
