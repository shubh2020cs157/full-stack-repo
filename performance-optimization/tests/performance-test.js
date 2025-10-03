const axios = require("axios");
const { performance } = require("perf_hooks");

const API_BASE_URL = "http://localhost:3008";

// Test endpoints
const slowEndpoints = [
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

async function makeRequest(endpoint) {
  const startTime = performance.now();
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    const endTime = performance.now();
    return {
      endpoint,
      duration: Math.round(endTime - startTime),
      success: true,
      status: response.status,
      data: response.data.performance,
    };
  } catch (error) {
    const endTime = performance.now();
    return {
      endpoint,
      duration: Math.round(endTime - startTime),
      success: false,
      error: error.message,
      status: error.response?.status,
    };
  }
}

async function runSequentialTest(endpoints, testName) {
  console.log(`\n🔍 Running ${testName}...`);
  console.log("=".repeat(50));

  const startTime = performance.now();
  const results = [];

  for (const endpoint of endpoints) {
    const result = await makeRequest(endpoint);
    results.push(result);
    console.log(
      `${result.success ? "✅" : "❌"} ${endpoint}: ${result.duration}ms`
    );
  }

  const endTime = performance.now();
  const totalDuration = Math.round(endTime - startTime);
  const successfulRequests = results.filter((r) => r.success).length;
  const averageDuration = Math.round(totalDuration / results.length);

  console.log("\n📊 Summary:");
  console.log(`Total Duration: ${totalDuration}ms`);
  console.log(`Average per Request: ${averageDuration}ms`);
  console.log(
    `Success Rate: ${Math.round((successfulRequests / results.length) * 100)}%`
  );

  return {
    testName,
    totalDuration,
    averageDuration,
    successRate: (successfulRequests / results.length) * 100,
    results,
  };
}

async function runBatchTest() {
  console.log("\n🔍 Running Batch API Test...");
  console.log("=".repeat(50));

  const startTime = performance.now();

  try {
    const response = await axios.get(`${API_BASE_URL}/api/fast/batch`);
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    console.log(`✅ Batch API: ${duration}ms`);
    console.log("\n📊 Summary:");
    console.log(`Total Duration: ${duration}ms`);
    console.log(`Average per Request: ${Math.round(duration / 6)}ms`);
    console.log(`Success Rate: 100%`);

    return {
      testName: "Batch API",
      totalDuration: duration,
      averageDuration: Math.round(duration / 6),
      successRate: 100,
      results: [
        {
          endpoint: "/api/fast/batch",
          duration,
          success: true,
          data: response.data.performance,
        },
      ],
    };
  } catch (error) {
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);

    console.log(`❌ Batch API: ${duration}ms - ${error.message}`);

    return {
      testName: "Batch API",
      totalDuration: duration,
      averageDuration: Math.round(duration / 6),
      successRate: 0,
      results: [
        {
          endpoint: "/api/fast/batch",
          duration,
          success: false,
          error: error.message,
        },
      ],
    };
  }
}

async function runLoadTest(endpoint, concurrentRequests = 10) {
  console.log(
    `\n🔍 Running Load Test (${concurrentRequests} concurrent requests)...`
  );
  console.log("=".repeat(50));

  const startTime = performance.now();
  const promises = [];

  for (let i = 0; i < concurrentRequests; i++) {
    promises.push(makeRequest(endpoint));
  }

  const results = await Promise.all(promises);
  const endTime = performance.now();
  const totalDuration = Math.round(endTime - startTime);
  const successfulRequests = results.filter((r) => r.success).length;
  const averageDuration = Math.round(
    results.reduce((sum, r) => sum + r.duration, 0) / results.length
  );

  console.log(`Total Duration: ${totalDuration}ms`);
  console.log(`Average Response Time: ${averageDuration}ms`);
  console.log(
    `Success Rate: ${Math.round((successfulRequests / results.length) * 100)}%`
  );
  console.log(
    `Requests per Second: ${Math.round(
      (concurrentRequests / totalDuration) * 1000
    )}`
  );

  return {
    testName: `Load Test (${concurrentRequests} concurrent)`,
    totalDuration,
    averageDuration,
    successRate: (successfulRequests / results.length) * 100,
    requestsPerSecond: Math.round((concurrentRequests / totalDuration) * 1000),
    results,
  };
}

async function main() {
  console.log("🚀 Performance Testing Suite");
  console.log("============================");
  console.log(`Testing API at: ${API_BASE_URL}`);

  try {
    // Check if server is running
    await axios.get(`${API_BASE_URL}/health`);
    console.log("✅ Server is running");
  } catch (error) {
    console.log("❌ Server is not running. Please start the server first.");
    console.log("Run: npm start");
    process.exit(1);
  }

  // Run all tests
  const slowResults = await runSequentialTest(
    slowEndpoints,
    "Slow APIs (Before Optimization)"
  );
  const fastResults = await runSequentialTest(
    fastEndpoints,
    "Fast APIs (After Optimization)"
  );
  const batchResults = await runBatchTest();

  // Run load tests
  const slowLoadTest = await runLoadTest("/api/slow/users", 5);
  const fastLoadTest = await runLoadTest("/api/fast/users", 5);

  // Performance comparison
  console.log("\n🎯 Performance Comparison");
  console.log("=".repeat(50));
  console.log(`Slow APIs Total Time: ${slowResults.totalDuration}ms`);
  console.log(`Fast APIs Total Time: ${fastResults.totalDuration}ms`);
  console.log(`Batch API Total Time: ${batchResults.totalDuration}ms`);

  const improvement = Math.round(
    ((slowResults.totalDuration - fastResults.totalDuration) /
      slowResults.totalDuration) *
      100
  );
  const batchImprovement = Math.round(
    ((slowResults.totalDuration - batchResults.totalDuration) /
      slowResults.totalDuration) *
      100
  );

  console.log(`\n📈 Performance Improvements:`);
  console.log(`Fast APIs vs Slow APIs: ${improvement}% faster`);
  console.log(`Batch API vs Slow APIs: ${batchImprovement}% faster`);

  // Load test comparison
  console.log(`\n⚡ Load Test Results:`);
  console.log(`Slow API RPS: ${slowLoadTest.requestsPerSecond}`);
  console.log(`Fast API RPS: ${fastLoadTest.requestsPerSecond}`);
  console.log(
    `RPS Improvement: ${Math.round(
      ((fastLoadTest.requestsPerSecond - slowLoadTest.requestsPerSecond) /
        slowLoadTest.requestsPerSecond) *
        100
    )}%`
  );

  console.log("\n✅ Performance testing completed!");
}

// Run the tests
main().catch(console.error);

