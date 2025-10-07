import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Applications from "../Pages/Applications";
import RootLayout from "../Layouts/RootLayout";
import ErrorPage from "../Pages/ErrorPage";
import InstalledApps from "../Pages/InstalledApps";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement:<p>Loading...</p>,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("./appsData.json"),
      },
      {
        path: "/apps",
        element: <Applications />,
      },
      {
        path: "installedapps",
        element: <InstalledApps />,
      },
    ],
  },
]);

export default router;
