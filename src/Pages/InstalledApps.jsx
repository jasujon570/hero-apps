import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useApp from "../Hooks/useApp";
import InstalledAppCard from "../Components/InstalledAppCard";

// LocalStorage Helper Functions
const getInstalledAppIds = () => {
  const installed = localStorage.getItem("installedApps");
  return installed ? JSON.parse(installed) : [];
};
const removeAppFromLocalStorage = (appId) => {
  let installedApps = getInstalledAppIds();
  installedApps = installedApps.filter((id) => id !== appId);
  localStorage.setItem("installedApps", JSON.stringify(installedApps));
};

// Download string to number converter
const convertDownloadsToNumber = (downloadStr) => {
  if (typeof downloadStr !== 'string') return 0;
  const upperCaseStr = downloadStr.toUpperCase();
  if (upperCaseStr.endsWith('M')) {
    return parseFloat(upperCaseStr) * 1000000;
  }
  if (upperCaseStr.endsWith('K')) {
    return parseFloat(upperCaseStr) * 1000;
  }
  return parseFloat(downloadStr);
};

const InstalledApps = () => {
  const { apps, loading } = useApp();
  const [installedApps, setInstalledApps] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    if (apps.length > 0) {
      const installedIds = getInstalledAppIds();
      const filteredApps = apps.filter((app) => installedIds.includes(app.id));
      setInstalledApps(filteredApps);
    }
  }, [apps]);

  const handleUninstall = (appId, appTitle) => {
    setInstalledApps((currentApps) =>
      currentApps.filter((app) => app.id !== appId)
    );
    removeAppFromLocalStorage(appId);
    toast.success(`${appTitle} has been uninstalled.`);
  };

  // Sorting logic with the fix
  const sortedApps = [...installedApps].sort((a, b) => {
    if (sortOrder === "high-low") {
      return convertDownloadsToNumber(b.downloads) - convertDownloadsToNumber(a.downloads);
    }
    if (sortOrder === "low-high") {
      // The typo is fixed here
      return convertDownloadsToNumber(a.downloads) - convertDownloadsToNumber(b.downloads);
    }
    return 0;
  });

  if (loading) {
    return <p className="text-center py-20">Loading installed apps...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Your Installed Apps</h1>
        <p className="text-gray-500 mt-2">
          Explore All Trending Apps on the Market developed by us
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="font-semibold text-gray-700">
          {sortedApps.length} Apps Found
        </span>
        
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="" disabled>Sort By Downloads</option>
          <option value="high-low">High-Low</option>
          <option value="low-high">Low-High</option>
        </select>
      </div>

      <div>
        {sortedApps.length > 0 ? (
          sortedApps.map((app) => (
            <InstalledAppCard
              key={app.id}
              app={app}
              onUninstall={handleUninstall}
            />
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700">
              No Apps Installed Yet
            </h3>
            <p className="text-gray-500 mt-2 mb-6">
              Go to the apps page to install some amazing apps!
            </p>
            <Link
              to="/apps"
              className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Explore Apps
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstalledApps;