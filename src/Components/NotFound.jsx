import appError from "../assets/App-Error.png";
import { Link } from "react-router-dom";

const NotFound = ({ onGoBack }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <img src={appError} alt="App Not Found" className="w-64 h-auto mb-8" />
      <h2 className="text-4xl font-bold text-gray-800 mb-2">
        OPPS!! APP NOT FOUND
      </h2>
      <p className="text-lg text-gray-500 mb-6">
        The App you are requesting is not found on our system. please try
        another apps
      </p>
      <button
        onClick={onGoBack}
        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300"
      >
        Go Back!
      </button>
    </div>
  );
};

export default NotFound;
