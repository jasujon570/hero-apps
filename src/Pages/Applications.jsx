import React from "react";
import useApp from "../Hooks/useApp";
import AppsDataCard from "../Components/AppsDataCard";

const AllApps = () => {
  const { apps } = useApp();
  return (
    <div className="pb-20">
      <div className="text-center">
        <h2 className="font-bold text-5xl pb-4">Our All Applications</h2>
        <p className="text-[#627382] text-[20px]">
          Explore All Apps on the Market developed by us. We code for Millions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-20 gap-4">
        {apps.map((app) => (
          <AppsDataCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
};

export default AllApps;
