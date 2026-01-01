import { createBrowserRouter } from "react-router-dom";
import Home from "./home";
import About from "./about";
import Donate from "./donate";
import Events from "./events";
import Classes from "./classes";
import JummahPrayer from "./jummah";
import Ramadhan from "./ramadhan";

// Add console.log to verify routes are loading
console.log("Loading routes with components:", { Home, About, Donate, Events, Classes });

export const routes = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/donate",
    element: <Donate />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "classes",
    element: <Classes />,
  },
  {
    path: "jummah",
    element: <JummahPrayer />,
  },
  {
    path: "ramadhan",
    element: <Ramadhan />,
  },
];

export const router = createBrowserRouter(routes);

// Add console.log to verify router creation
console.log("Router created:", router); 