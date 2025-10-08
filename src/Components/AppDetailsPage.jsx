import { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import starIcon from "../assets/icon-ratings.png";
import reviewIcon from "../assets/icon-review.png";
import downloadIcon from "../assets/icon-downloads.png";
import Container from "./Container";
import ErrorPage from "../Pages/ErrorPage";

const formatNumber = (num) => {
  if (num >= 1000000)
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return num;
};

const processRatingsForChart = (ratings) => {
  return ratings
    .map((r) => ({
      name: `${r.name.split(" ")[0]} star`,
      count: r.count,
    }))
    .sort((a, b) => parseInt(b.name) - parseInt(a.name));
};

const getInstalledApps = () => {
  const installed = localStorage.getItem("installedApps");
  return installed ? JSON.parse(installed) : [];
};

const addAppToLocalStorage = (appId) => {
  const installedApps = getInstalledApps();
  if (!installedApps.includes(appId)) {
    const newInstalledApps = [...installedApps, appId];
    localStorage.setItem("installedApps", JSON.stringify(newInstalledApps));
  }
};

const AppDetailsPage = () => {
  const loaderData = useLoaderData();
  const allAppsData = Array.isArray(loaderData) ? loaderData : [];

  const { id } = useParams();
  const app = allAppsData.find((app) => app.id === parseInt(id));

  const [isInstalled, setIsInstalled] = useState(() => {
    const installedApps = getInstalledApps();
    return installedApps.includes(parseInt(id));
  });

  const handleInstall = () => {
    setIsInstalled(true);
    addAppToLocalStorage(app.id);
    toast.success(`${app.title} has been installed successfully!`);
  };

  if (!app) {
    return (
      <div className="text-center py-20 text-xl font-bold">
        <ErrorPage />
      </div>
    );
  }

  const chartData = processRatingsForChart(app.ratings);
  const totalReviews = app.reviews;

  return (
    <div className="bg-[#F5F5F5] w-screen relative left-1/2 -translate-x-1/2">
      <Container>
        <div className="mx-auto p-4 md:p-8 max-w-screen-2xl">
          <header className="flex flex-col md:flex-row items-start gap-6 border-b pb-8 mb-8">
            <img
              src={app.image}
              alt={app.title}
              className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-2xl p-4 bg-gray-100"
            />
            <div className="flex flex-col gap-2 w-full">
              <div className="border-b">
                <h1 className="text-3xl font-bold text-gray-900 leading-snug">
                  {app.title}
                </h1>
                <p className="text-md text-gray-500 mb-4">
                  Developed by{" "}
                  <span className="text-blue-600 font-medium">
                    {app.companyName}
                  </span>
                </p>
              </div>
              <div className="flex gap-8 mt-4 pt-2 border-t md:border-t-0 justify-between sm:justify-start">
                <div className="text-center">
                  <img
                    src={downloadIcon}
                    alt="Downloads"
                    className="w-5 h-5 mx-auto mb-1 opacity-70"
                  />
                  <p className="text-xl font-bold text-gray-800">
                    {app.downloads}
                  </p>
                  <p className="text-sm text-gray-500">Downloads</p>
                </div>
                <div className="text-center">
                  <img
                    src={starIcon}
                    alt="Rating"
                    className="w-5 h-5 mx-auto mb-1 opacity-70"
                  />
                  <p className="text-xl font-bold text-gray-800">
                    {app.ratingAvg}
                  </p>
                  <p className="text-sm text-gray-500">Avg Ratings</p>
                </div>
                <div className="text-center">
                  <img
                    src={reviewIcon}
                    alt="Reviews"
                    className="w-5 h-5 mx-auto mb-1 opacity-70"
                  />
                  <p className="text-xl font-bold text-gray-800">
                    {formatNumber(totalReviews)}
                  </p>
                  <p className="text-sm text-gray-500">Total Reviews</p>
                </div>
              </div>

              <button
                onClick={handleInstall}
                disabled={isInstalled}
                className={`btn mt-6 w-fit text-white font-semibold py-2 px-6 rounded-lg shadow-lg flex items-center gap-2 transition ease-in-out duration-300 ${
                  isInstalled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#632ee3] to-[#9f62f2] hover:from-[#9f62f2] hover:to-[#632ee3]"
                }`}
              >
                {isInstalled ? "Installed" : `Install Now (${app.size} MB)`}
              </button>
            </div>
          </header>

          <section className="py-8 border-b mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Ratings
            </h2>
            <div style={{ width: "100%", height: 250, paddingRight: 20 }}>
              <ResponsiveContainer>
                <BarChart
                  layout="vertical"
                  data={chartData}
                  margin={{ top: 0, right: 30, left: 20, bottom: 20 }}
                >
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 13 }}
                    width={60}
                  />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    domain={[0, 12000]}
                    ticks={[0, 3000, 6000, 9000, 12000]}
                    interval="preserveStartEnd"
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    formatter={(value) => [
                      new Intl.NumberFormat().format(value),
                      "Reviews",
                    ]}
                  />
                  <Bar
                    dataKey="count"
                    fill="#FF8C00"
                    barSize={15}
                    radius={[0, 10, 10, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {app.description}
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default AppDetailsPage;
