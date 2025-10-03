import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

const PortfolioPreview: React.FC = () => {
  const { state } = usePortfolio();

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Live Preview
      </h3>

      <div
        className="relative w-full h-96 rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300"
        style={{ backgroundColor: state.backgroundColor }}
      >
        {/* Portfolio Card */}
        <div className="absolute inset-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
          {/* Profile Picture */}
          <div className="mb-4">
            {state.profilePicture ? (
              <img
                src={state.profilePicture}
                alt="Profile"
                className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-28 h-28 bg-gray-200 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Name */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {state.name || "Your Name"}
            </h2>
            <p className="text-sm text-gray-600">
              {state.name ? "Portfolio Owner" : "Add your name above"}
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="mt-6 flex space-x-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
            <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-16 h-16 border border-gray-300 rounded-full"></div>
          <div className="absolute bottom-8 left-6 w-8 h-8 border border-gray-300 rounded-full"></div>
          <div className="absolute top-1/2 left-4 w-4 h-4 border border-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Profile Picture:</span>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              state.profilePicture
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {state.profilePicture ? "Added" : "Not added"}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Name:</span>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              state.name
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {state.name ? "Added" : "Not added"}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Background:</span>
          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
            Custom
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;
