import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Applications from "../Pages/Applications";

const router = createBrowserRouter ([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/Apps',
    element: <Applications/>
  },

])



export default router;