import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

const BackgroundColorPicker: React.FC = () => {
  const { state, updateBackgroundColor } = usePortfolio();

  const predefinedColors = [
    { name: "Light Gray", value: "#f8fafc" },
    { name: "White", value: "#ffffff" },
    { name: "Light Blue", value: "#eff6ff" },
    { name: "Light Green", value: "#f0fdf4" },
    { name: "Light Purple", value: "#faf5ff" },
    { name: "Light Pink", value: "#fdf2f8" },
    { name: "Light Yellow", value: "#fefce8" },
    { name: "Light Orange", value: "#fff7ed" },
    { name: "Light Indigo", value: "#eef2ff" },
    { name: "Light Rose", value: "#fff1f2" },
  ];

  const handleColorChange = (color: string) => {
    updateBackgroundColor(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBackgroundColor(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Background Color
      </h3>

      {/* Predefined Colors */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-3 text-center">
          Choose a preset color:
        </p>
        <div className="grid grid-cols-5 gap-3">
          {predefinedColors.map((color) => (
            <button
              key={color.value}
              onClick={() => handleColorChange(color.value)}
              className={`
                w-12 h-12 rounded-lg border-2 transition-all duration-200 hover:scale-105
                ${
                  state.backgroundColor === color.value
                    ? "border-gray-800 ring-2 ring-primary-500"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Custom Color Picker */}
      <div className="space-y-3">
        <p className="text-sm text-gray-600 text-center">
          Or choose a custom color:
        </p>
        <div className="flex items-center justify-center space-x-3">
          <input
            type="color"
            value={state.backgroundColor}
            onChange={handleCustomColorChange}
            className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
          />
          <div className="flex-1">
            <input
              type="text"
              value={state.backgroundColor}
              onChange={(e) => handleColorChange(e.target.value)}
              placeholder="#ffffff"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm font-mono"
            />
          </div>
        </div>
      </div>

      {/* Current Color Preview */}
      <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600 text-center mb-2">
          Current background:
        </p>
        <div
          className="w-full h-8 rounded-lg border border-gray-200"
          style={{ backgroundColor: state.backgroundColor }}
        />
        <p className="text-xs text-gray-500 text-center mt-1 font-mono">
          {state.backgroundColor}
        </p>
      </div>
    </div>
  );
};

export default BackgroundColorPicker;
