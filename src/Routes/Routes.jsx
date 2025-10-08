import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Applications from "../Pages/Applications";
import RootLayout from "../Layouts/RootLayout";
import ErrorPage from "../Pages/ErrorPage";
import InstalledApps from "../Pages/InstalledApps";
import AppDetailsPage from "../Components/AppDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <p>Loading...</p>,
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
        path: "/app-details/:id",
        element: <AppDetailsPage />,
        loader: () => fetch("./appsData.json").then(res => res.json()),
      },
      {
        path: "installedapps",
        element: <InstalledApps />,
      },
    ],
  },
]);

export default router;
