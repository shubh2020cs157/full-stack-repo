const autocannon = require("autocannon");
const { performance } = require("perf_hooks");

const API_BASE_URL = "http://localhost:3008";

async function runBenchmark(endpoint, options = {}) {
  const defaultOptions = {
    url: `${API_BASE_URL}${endpoint}`,
    connections: 10,
    pipelining: 1,
    duration: 10,
    ...options,
  };

  console.log(`\n🔍 Benchmarking: ${endpoint}`);
  console.log("=".repeat(50));
  console.log(`Connections: ${defaultOptions.connections}`);
  console.log(`Duration: ${defaultOptions.duration}s`);
  console.log(`Pipelining: ${defaultOptions.pipelining}`);

  const result = await autocannon(defaultOptions);

  console.log("\n📊 Results:");
  console.log(`Requests: ${result.requests.total}`);
  console.log(`Duration: ${result.duration}s`);
  console.log(
    `Throughput: ${Math.round(result.throughput.average)} requests/sec`
  );
  console.log(`Latency Average: ${Math.round(result.latency.average)}ms`);
  console.log(`Latency P95: ${Math.round(result.latency.p95)}ms`);
  console.log(`Latency P99: ${Math.round(result.latency.p99)}ms`);
  console.log(`Errors: ${result.errors}`);
  console.log(`Timeouts: ${result.timeouts}`);

  return result;
}

async function compareEndpoints() {
  console.log("🚀 Performance Benchmark Suite");
  console.log("===============================");

  const endpoints = [
    { path: "/api/slow/users", name: "Slow Users API" },
    { path: "/api/fast/users", name: "Fast Users API" },
    { path: "/api/slow/posts", name: "Slow Posts API" },
    { path: "/api/fast/posts", name: "Fast Posts API" },
    { path: "/api/fast/batch", name: "Batch API" },
  ];

  const results = [];

  for (const endpoint of endpoints) {
    try {
      const result = await runBenchmark(endpoint.path, {
        connections: 5,
        duration: 5,
      });

      results.push({
        name: endpoint.name,
        path: endpoint.path,
        throughput: Math.round(result.throughput.average),
        latency: Math.round(result.latency.average),
        requests: result.requests.total,
        errors: result.errors,
      });
    } catch (error) {
      console.log(`❌ Error benchmarking ${endpoint.name}: ${error.message}`);
    }
  }

  // Summary comparison
  console.log("\n🎯 Performance Summary");
  console.log("=".repeat(50));

  results.forEach((result) => {
    console.log(`${result.name}:`);
    console.log(`  Throughput: ${result.throughput} req/s`);
    console.log(`  Latency: ${result.latency}ms`);
    console.log(`  Requests: ${result.requests}`);
    console.log(`  Errors: ${result.errors}`);
    console.log("");
  });

  // Find best performers
  const bestThroughput = results.reduce((best, current) =>
    current.throughput > best.throughput ? current : best
  );

  const bestLatency = results.reduce((best, current) =>
    current.latency < best.latency ? current : best
  );

  console.log("🏆 Best Performers:");
  console.log(
    `Highest Throughput: ${bestThroughput.name} (${bestThroughput.throughput} req/s)`
  );
  console.log(`Lowest Latency: ${bestLatency.name} (${bestLatency.latency}ms)`);
}

async function stressTest() {
  console.log("\n💪 Stress Test");
  console.log("=".repeat(50));

  const stressTestOptions = {
    connections: 50,
    pipelining: 5,
    duration: 30,
  };

  console.log("Testing Fast API under high load...");
  const fastResult = await runBenchmark("/api/fast/users", stressTestOptions);

  console.log("\nTesting Slow API under high load...");
  const slowResult = await runBenchmark("/api/slow/users", stressTestOptions);

  console.log("\n📊 Stress Test Comparison:");
  console.log(
    `Fast API - Throughput: ${Math.round(
      fastResult.throughput.average
    )} req/s, Latency: ${Math.round(fastResult.latency.average)}ms`
  );
  console.log(
    `Slow API - Throughput: ${Math.round(
      slowResult.throughput.average
    )} req/s, Latency: ${Math.round(slowResult.latency.average)}ms`
  );

  const throughputImprovement = Math.round(
    ((fastResult.throughput.average - slowResult.throughput.average) /
      slowResult.throughput.average) *
      100
  );
  const latencyImprovement = Math.round(
    ((slowResult.latency.average - fastResult.latency.average) /
      slowResult.latency.average) *
      100
  );

  console.log(`\n📈 Improvements under stress:`);
  console.log(`Throughput: ${throughputImprovement}% better`);
  console.log(`Latency: ${latencyImprovement}% better`);
}

async function main() {
  try {
    await compareEndpoints();
    await stressTest();
    console.log("\n✅ Benchmarking completed!");
  } catch (error) {
    console.error("❌ Benchmarking failed:", error.message);
    process.exit(1);
  }
}

// Run benchmarks
main();

