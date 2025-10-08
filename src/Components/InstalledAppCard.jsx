import React from "react";
import downloadIcon from "../assets/icon-downloads.png";
import starIcon from "../assets/icon-ratings.png";

const InstalledAppCard = ({ app, onUninstall }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center gap-4">
        <img
          src={app.image}
          alt={app.title}
          className="w-16 h-16 object-contain bg-gray-100 rounded-lg p-2"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{app.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
            <span className="flex items-center gap-1">
              <img src={downloadIcon} alt="downloads" className="w-4 h-4 opacity-70" />
              {app.downloads}
            </span>
            <span className="flex items-center gap-1">
              <img src={starIcon} alt="rating" className="w-4 h-4 opacity-70" />
              {app.ratingAvg}
            </span>
            <span>{app.size} MB</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => onUninstall(app.id, app.title)}
        className="bg-red-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-600 transition-colors duration-300"
      >
        Uninstall
      </button>
    </div>
  );
};

export default InstalledAppCard;