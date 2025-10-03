import React, { useRef, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";

const ProfilePictureUpload: React.FC = () => {
  const { state, updateProfilePicture, setLoading } = usePortfolio();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      alert("File size must be less than 5MB");
      return;
    }

    setLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      updateProfilePicture(result);
      setLoading(false);
    };

    reader.onerror = () => {
      alert("Error reading file");
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    updateProfilePicture(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Profile Picture
      </h3>

      <div
        className={`
          profile-picture-container mx-auto
          ${dragActive ? "drag-active" : ""}
          ${state.profilePicture ? "has-image" : ""}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {state.profilePicture ? (
          <>
            <div className="image-wrapper">
              <img
                src={state.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {state.isLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="remove-button"
              title="Remove profile picture"
            >
              ×
            </button>
          </>
        ) : (
          <div className="upload-content">
            <svg
              className="w-12 h-12 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="text-sm px-4">
              {dragActive ? "Drop image here" : "Click or drag to upload"}
            </p>
            <p className="text-xs mt-1">Max 5MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
