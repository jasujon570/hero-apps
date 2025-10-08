import React from "react";
import errorImg from "../assets/error-404.png";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <img src={errorImg} alt="App Not Found" className="w-64 h-auto mb-8" />
      <h2 className="text-4xl font-bold text-gray-800 mb-2 uppercase">
        Oops, page not found!
      </h2>
      <p className="text-lg text-gray-500 mb-6">
        The page you are looking for is not available.
      </p>
      <Link to='/' className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300">
        Go Back!
      </Link>
    </div>
  );
};

export default ErrorPage;
