import { Link } from "react-router-dom";
import downloadIcon from "../assets/icon-downloads.png";
import starIcon from "../assets/icon-ratings.png";

const AppsDataCard = ({ app }) => {
  const roundRating = Math.round(app.ratingAvg);
  const { title, downloads, image, id } = app;

  return (
    <Link
      to={`/app-details/${id}`}
      className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex justify-between flex-col gap-3 hover:scale-105 transition ease-in-out"
    >
      <figure className="aspect-square overflow-hidden ">
        <img
          className="w-full h-full rounded-lg object-cover"
          src={image}
          alt={title}
        />
      </figure>

      <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
        {title}
      </h3>

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-md">
          <img src={downloadIcon} alt="Download" className="w-4 h-4" />
          <span className="text-sm font-medium text-green-800">
            {downloads}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-100 rounded-md">
          <img src={starIcon} alt="Rating" className="w-4 h-4" />
          <span className="text-sm font-bold text-orange-800">
            {roundRating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default AppsDataCard;
