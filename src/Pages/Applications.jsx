import React, { useState } from "react";
import useApp from "../Hooks/useApp";
import AppsDataCard from "../Components/AppsDataCard";
import NotFound from "../Components/NotFound";

const AllApps = () => {
  const { apps } = useApp();
  const [search, setSearch] = useState("");
  const term = search.trim().toLowerCase();
  const searchApp = term
    ? apps.filter((app) => app.title.toLowerCase().includes(term))
    : apps;

  const handleGoBack = () => {
    setSearch("");
  };
  return (
    <div className="py-20">
      <div className="text-center">
        <h2 className="font-bold text-5xl pb-4">Our All Applications</h2>
        <p className="text-[#627382] text-[20px]">
          Explore All Apps on the Market developed by us. We code for Millions
        </p>
      </div>
      <div className="flex justify-between pt-10">
        <span className="font-semibold text-2xl">
          ({searchApp.length}) Apps Found
        </span>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            value={search}
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            required
            placeholder="Search Apps"
          />
        </label>
      </div>
      {searchApp.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 gap-4">
          {searchApp.map((app) => (
            <AppsDataCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <NotFound onGoBack={handleGoBack} />
      )}
    </div>
  );
};

export default AllApps;
