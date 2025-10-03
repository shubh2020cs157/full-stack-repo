"use client";

import { useSession } from "next-auth/react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthButton from "@/components/AuthButton";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">
                  Welcome to your OAuth-protected dashboard
                </p>
              </div>
              <AuthButton />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  🎉 OAuth Authentication Successful!
                </h2>
                <p className="text-gray-600 mb-8">
                  You have successfully authenticated with Google OAuth. This is
                  a protected route that only authenticated users can access.
                </p>

                {/* User Information */}
                {session && (
                  <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Your Profile Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        {session.user?.image && (
                          <img
                            src={session.user.image}
                            alt={session.user.name || "User"}
                            className="w-12 h-12 rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {session.user?.name || "No name provided"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {session.user?.email || "No email provided"}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Session Details:
                        </h4>
                        <div className="text-xs text-gray-600 space-y-1">
                          <p>
                            <strong>Status:</strong> {status}
                          </p>
                          <p>
                            <strong>User ID:</strong>{" "}
                            {session.user?.id || "N/A"}
                          </p>
                          <p>
                            <strong>Role:</strong>{" "}
                            {session.user?.role || "user"}
                          </p>
                          <p>
                            <strong>Provider:</strong> Google OAuth
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features List */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-center">
                      <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 mb-3">
                        <svg
                          className="h-5 w-5 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Secure Authentication
                      </h3>
                      <p className="text-sm text-gray-600">
                        Protected routes with NextAuth.js and Google OAuth 2.0
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-center">
                      <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-green-100 mb-3">
                        <svg
                          className="h-5 w-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Session Management
                      </h3>
                      <p className="text-sm text-gray-600">
                        JWT-based sessions with automatic refresh and
                        persistence
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-center">
                      <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 mb-3">
                        <svg
                          className="h-5 w-5 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        TypeScript Support
                      </h3>
                      <p className="text-sm text-gray-600">
                        Full type safety with Next.js 14 and TypeScript
                      </p>
                    </div>
                  </div>
                </div>

                {/* API Test Section */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Test Protected API Endpoint
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Click the button below to test a protected API endpoint that
                    requires authentication.
                  </p>
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch("/api/protected");
                        const data = await response.json();
                        alert(`API Response: ${JSON.stringify(data, null, 2)}`);
                      } catch (error) {
                        alert(`Error: ${error}`);
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Test Protected API
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
