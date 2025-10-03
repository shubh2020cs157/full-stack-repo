"use client";

import { useState } from "react";
import PerformanceTest from "@/components/PerformanceTest";
import OptimizationGuide from "@/components/OptimizationGuide";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"test" | "guide">("test");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                🚀 Performance Optimization Demo
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("test")}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === "test"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Performance Test
              </button>
              <button
                onClick={() => setActiveTab("guide")}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === "guide"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Optimization Guide
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "test" ? <PerformanceTest /> : <OptimizationGuide />}
      </main>
    </div>
  );
}
