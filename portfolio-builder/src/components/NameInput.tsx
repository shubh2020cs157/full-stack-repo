import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

const NameInput: React.FC = () => {
  const { state, updateName } = usePortfolio();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateName(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Your Name
      </h3>

      <div className="relative">
        <input
          type="text"
          value={state.name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-center text-lg font-medium placeholder-gray-400"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
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
      </div>

      {state.name && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600">
            Preview:{" "}
            <span className="font-semibold text-gray-800">{state.name}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default NameInput;
