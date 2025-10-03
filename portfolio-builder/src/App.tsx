import React from "react";
import { PortfolioProvider } from "./context/PortfolioContext";
import ProfilePictureUpload from "./components/ProfilePictureUpload";
import NameInput from "./components/NameInput";
import BackgroundColorPicker from "./components/BackgroundColorPicker";
import PortfolioPreview from "./components/PortfolioPreview";

function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Portfolio Builder
              </h1>
              <p className="text-gray-600">
                Create your personalized portfolio with a custom profile
                picture, name, and background
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Controls */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <ProfilePictureUpload />
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <NameInput />
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <BackgroundColorPicker />
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <PortfolioPreview />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">
                Built with React, TypeScript, and Tailwind CSS
              </p>
              <p className="text-sm">
                Drag & drop images, customize colors, and see live preview
              </p>
            </div>
          </div>
        </footer>
      </div>
    </PortfolioProvider>
  );
}

export default App;
