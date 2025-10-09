import { createBrowserRouter } from "react-router-dom";
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
      },
      {
        path: "/apps",
        element: <Applications />,
      },
      {
        path: "/app-details/:id",
        element: <AppDetailsPage />,
        loader: async ({ params }) => {
          const res = await fetch("/appsData.json");
          const apps = await res.json();
          const app = apps.find((app) => app.id === parseInt(params.id));
          if (!app) {
            throw new Response("App Not Found", {
              status: 404,
              statusText: "The app you are looking for does not exist.",
            });
          }
          return { app };
        },
      },
      {
        path: "/installedapps",
        element: <InstalledApps />,
      },
    ],
  },
]);

export default router;
