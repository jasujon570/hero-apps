import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
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

const getInstalledAppIds = () => {
  const installed = localStorage.getItem("installedApps");
  return installed ? JSON.parse(installed) : [];
};

const addAppToLocalStorage = (appId) => {
  const installedApps = getInstalledAppIds();
  if (!installedApps.includes(appId)) {
    installedApps.push(appId);
    localStorage.setItem("installedApps", JSON.stringify(installedApps));
  }
};

const AppDetailsPage = () => {
const { app } = useLoaderData();
  const {
    image,
    title,
    companyName,
    id,
    description,
    size,
    reviews,
    ratingAvg,
    downloads,
    ratings,
  } = app;

  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const installedIds = getInstalledAppIds();
    if (installedIds.includes(id)) {
      setIsInstalled(true);
    }
  }, [id]);

const handleInstall = () => {
    addAppToLocalStorage(id);
    setIsInstalled(true);
    toast.success(`${title} has been installed successfully!`);
  };


  const chartData = processRatingsForChart(ratings);
  const totalReviews = reviews;

  return (
    <div className="bg-[#F5F5F5] w-screen relative left-1/2 -translate-x-1/2">
      <Container>
        <div className="mx-auto p-4 md:p-8 max-w-screen-2xl">
          <header className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={image}
              alt={title}
              className="w-48 h-48 rounded-3xl object-cover shadow-lg mx-auto"
            />
            <div className="flex-1">
              <div className="border-b">
                <h1 className="text-3xl font-bold text-gray-900 leading-snug">
                  {title}
                </h1>
                <p className="text-md text-gray-500 mb-4">
                  Developed by{" "}
                  <span className="text-blue-600 font-medium">
                    {companyName}
                  </span>
                </p>
              </div>
              <div className="flex gap-8 mt-4 pt-2 md:border-t-0 justify-between sm:justify-start">
                <div className="text-center">
                  <img
                    src={downloadIcon}
                    alt="Downloads"
                    className="w-5 h-5 mx-auto mb-1 opacity-70"
                  />
                  <p className="text-xl font-bold text-gray-800">
                    {downloads}
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
                    {ratingAvg}
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
                {isInstalled ? "Installed" : `Install Now (${size} MB)`}
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
              {description}
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default AppDetailsPage;



