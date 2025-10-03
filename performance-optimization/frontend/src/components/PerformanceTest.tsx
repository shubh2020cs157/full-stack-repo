"use client";

import { useState } from "react";

interface TestResult {
  endpoint: string;
  duration: number;
  success: boolean;
  data?: any;
  error?: string;
}

interface PerformanceMetrics {
  totalDuration: number;
  averageDuration: number;
  successRate: number;
  results: TestResult[];
}

const API_BASE_URL = "http://localhost:3008";

export default function PerformanceTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [slowResults, setSlowResults] = useState<PerformanceMetrics | null>(
    null
  );
  const [fastResults, setFastResults] = useState<PerformanceMetrics | null>(
    null
  );
  const [batchResults, setBatchResults] = useState<PerformanceMetrics | null>(
    null
  );

  const endpoints = [
    "/api/slow/users",
    "/api/slow/posts",
    "/api/slow/comments",
    "/api/slow/external-data",
    "/api/slow/analytics",
    "/api/slow/notifications",
  ];

  const fastEndpoints = [
    "/api/fast/users",
    "/api/fast/posts",
    "/api/fast/comments",
    "/api/fast/external-data",
    "/api/fast/analytics",
    "/api/fast/notifications",
  ];

  const makeRequest = async (endpoint: string): Promise<TestResult> => {
    const startTime = Date.now();
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      const data = await response.json();
      const endTime = Date.now();

      return {
        endpoint,
        duration: endTime - startTime,
        success: response.ok,
        data: data.performance,
      };
    } catch (error) {
      const endTime = Date.now();
      return {
        endpoint,
        duration: endTime - startTime,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const runSequentialTest = async (
    endpoints: string[],
    setResults: (results: PerformanceMetrics) => void
  ) => {
    setIsLoading(true);
    const startTime = Date.now();
    const results: TestResult[] = [];

    for (const endpoint of endpoints) {
      const result = await makeRequest(endpoint);
      results.push(result);
    }

    const endTime = Date.now();
    const totalDuration = endTime - startTime;
    const successfulRequests = results.filter((r) => r.success).length;

    setResults({
      totalDuration,
      averageDuration: totalDuration / results.length,
      successRate: (successfulRequests / results.length) * 100,
      results,
    });
    setIsLoading(false);
  };

  const runBatchTest = async () => {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      const response = await fetch(`${API_BASE_URL}/api/fast/batch`);
      const data = await response.json();
      const endTime = Date.now();

      setBatchResults({
        totalDuration: endTime - startTime,
        averageDuration: (endTime - startTime) / 6,
        successRate: response.success ? 100 : 0,
        results: [
          {
            endpoint: "/api/fast/batch",
            duration: endTime - startTime,
            success: response.success,
            data: data.performance,
          },
        ],
      });
    } catch (error) {
      const endTime = Date.now();
      setBatchResults({
        totalDuration: endTime - startTime,
        averageDuration: (endTime - startTime) / 6,
        successRate: 0,
        results: [
          {
            endpoint: "/api/fast/batch",
            duration: endTime - startTime,
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
          },
        ],
      });
    }
    setIsLoading(false);
  };

  const getPerformanceColor = (duration: number) => {
    if (duration < 100) return "text-green-600";
    if (duration < 500) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceBadge = (duration: number) => {
    if (duration < 100) return "🟢 Excellent";
    if (duration < 500) return "🟡 Good";
    if (duration < 1000) return "🟠 Fair";
    return "🔴 Poor";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Performance Testing Dashboard
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Compare the performance of slow vs optimized API endpoints. This
          demonstrates how proper optimization can reduce response times from 9+
          seconds to under 1 second.
        </p>
      </div>

      {/* Test Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Run Performance Tests</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => runSequentialTest(endpoints, setSlowResults)}
            disabled={isLoading}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? "Testing..." : "🔴 Test Slow APIs (Sequential)"}
          </button>

          <button
            onClick={() => runSequentialTest(fastEndpoints, setFastResults)}
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? "Testing..." : "🟢 Test Fast APIs (Sequential)"}
          </button>

          <button
            onClick={runBatchTest}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? "Testing..." : "⚡ Test Batch API (Parallel)"}
          </button>
        </div>
      </div>

      {/* Results Comparison */}
      {(slowResults || fastResults || batchResults) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Slow Results */}
          {slowResults && (
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
              <h3 className="text-xl font-semibold text-red-600 mb-4">
                🔴 Slow APIs (Before Optimization)
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Total Duration:</span>
                  <span className="text-red-600 font-bold">
                    {slowResults.totalDuration}ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Average per Request:</span>
                  <span className="text-red-600">
                    {Math.round(slowResults.averageDuration)}ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Success Rate:</span>
                  <span className="text-red-600">
                    {slowResults.successRate.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Individual Results:</h4>
                  <div className="space-y-1 text-sm">
                    {slowResults.results.map((result, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="truncate">
                          {result.endpoint.split("/").pop()}
                        </span>
                        <span className={getPerformanceColor(result.duration)}>
                          {result.duration}ms
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fast Results */}
          {fastResults && (
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-semibold text-green-600 mb-4">
                🟢 Fast APIs (After Optimization)
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Total Duration:</span>
                  <span className="text-green-600 font-bold">
                    {fastResults.totalDuration}ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Average per Request:</span>
                  <span className="text-green-600">
                    {Math.round(fastResults.averageDuration)}ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Success Rate:</span>
                  <span className="text-green-600">
                    {fastResults.successRate.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Individual Results:</h4>
                  <div className="space-y-1 text-sm">
                    {fastResults.results.map((result, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="truncate">
                          {result.endpoint.split("/").pop()}
                        </span>
                        <span className={getPerformanceColor(result.duration)}>
                          {result.duration}ms
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Batch Results */}
          {batchResults && (
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                ⚡ Batch API (Parallel Execution)
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Total Duration:</span>
                  <span className="text-blue-600 font-bold">
                    {batchResults.totalDuration}ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Average per Request:</span>
                  <span className="text-blue-600">
                    {Math.round(batchResults.averageDuration)}ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Success Rate:</span>
                  <span className="text-blue-600">
                    {batchResults.successRate.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Optimization:</h4>
                  <span className="text-sm text-blue-600">
                    Parallel execution of all 6 requests
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Performance Comparison Summary */}
      {slowResults && fastResults && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">
            📊 Performance Improvement Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {slowResults.totalDuration}ms
              </div>
              <div className="text-sm text-gray-600">Before Optimization</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {fastResults.totalDuration}ms
              </div>
              <div className="text-sm text-gray-600">After Optimization</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(
                  ((slowResults.totalDuration - fastResults.totalDuration) /
                    slowResults.totalDuration) *
                    100
                )}
                %
              </div>
              <div className="text-sm text-gray-600">Improvement</div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">
          💡 Key Performance Insights
        </h3>
        <ul className="space-y-2 text-yellow-700">
          <li>
            • <strong>Caching:</strong> Reduces database queries by storing
            frequently accessed data
          </li>
          <li>
            • <strong>Database Optimization:</strong> Faster queries through
            indexing and query optimization
          </li>
          <li>
            • <strong>Parallel Execution:</strong> Process multiple requests
            simultaneously instead of sequentially
          </li>
          <li>
            • <strong>Connection Pooling:</strong> Reuse database connections to
            reduce overhead
          </li>
          <li>
            • <strong>Response Compression:</strong> Reduce payload size with
            gzip compression
          </li>
        </ul>
      </div>
    </div>
  );
}

