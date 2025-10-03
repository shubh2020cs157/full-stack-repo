"use client";

export default function OptimizationGuide() {
  const optimizationTechniques = [
    {
      category: "Database Optimization",
      techniques: [
        {
          name: "Indexing",
          description:
            "Create proper database indexes on frequently queried columns",
          example: "CREATE INDEX idx_user_email ON users(email);",
          impact: "Reduces query time from 1000ms to 50ms",
        },
        {
          name: "Query Optimization",
          description:
            "Optimize SQL queries to reduce complexity and execution time",
          example: "SELECT * FROM posts WHERE status = 'published' LIMIT 10;",
          impact: "Eliminates unnecessary data fetching",
        },
        {
          name: "Connection Pooling",
          description:
            "Reuse database connections instead of creating new ones",
          example: "const pool = new Pool({ max: 20, min: 5 });",
          impact: "Reduces connection overhead by 80%",
        },
      ],
    },
    {
      category: "Caching Strategies",
      techniques: [
        {
          name: "In-Memory Caching",
          description: "Store frequently accessed data in memory",
          example: "const cache = new NodeCache({ stdTTL: 300 });",
          impact: "Reduces database calls by 90% for cached data",
        },
        {
          name: "Redis Caching",
          description: "Distributed caching for multi-server applications",
          example: "await redis.set('user:123', JSON.stringify(userData));",
          impact: "Enables horizontal scaling with shared cache",
        },
        {
          name: "HTTP Caching",
          description: "Leverage browser and CDN caching",
          example: "Cache-Control: public, max-age=3600",
          impact: "Reduces server load by 70%",
        },
      ],
    },
    {
      category: "API Optimization",
      techniques: [
        {
          name: "Parallel Requests",
          description: "Execute multiple API calls simultaneously",
          example:
            "const results = await Promise.all([api1(), api2(), api3()]);",
          impact: "Reduces total time from 9s to 2s for 6 requests",
        },
        {
          name: "Request Batching",
          description: "Combine multiple requests into a single API call",
          example: "GET /api/batch?endpoints=users,posts,comments",
          impact: "Reduces network overhead by 60%",
        },
        {
          name: "Pagination",
          description: "Load data in smaller chunks",
          example: "GET /api/posts?page=1&limit=20",
          impact: "Reduces initial load time by 80%",
        },
      ],
    },
    {
      category: "Frontend Optimization",
      techniques: [
        {
          name: "Lazy Loading",
          description: "Load components and data only when needed",
          example: "const LazyComponent = lazy(() => import('./Component'));",
          impact: "Reduces initial bundle size by 50%",
        },
        {
          name: "Memoization",
          description: "Cache expensive computations and API responses",
          example:
            "const memoizedValue = useMemo(() => expensiveCalculation(), [deps]);",
          impact: "Prevents unnecessary re-renders and calculations",
        },
        {
          name: "Code Splitting",
          description: "Split code into smaller chunks for faster loading",
          example: "const Dashboard = lazy(() => import('./Dashboard'));",
          impact: "Reduces initial load time by 40%",
        },
      ],
    },
  ];

  const performanceMetrics = [
    {
      metric: "Response Time",
      before: "1500ms average",
      after: "150ms average",
      improvement: "90% faster",
    },
    {
      metric: "Database Queries",
      before: "6 queries per request",
      after: "1 query per request (cached)",
      improvement: "83% reduction",
    },
    {
      metric: "Memory Usage",
      before: "High due to repeated queries",
      after: "Optimized with caching",
      improvement: "60% reduction",
    },
    {
      metric: "Server Load",
      before: "100% CPU during peak",
      after: "40% CPU during peak",
      improvement: "60% reduction",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          🚀 Performance Optimization Guide
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive strategies to optimize API performance from 9+ seconds
          to under 1 second. Learn the techniques used in modern
          high-performance applications.
        </p>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-6">
          📊 Performance Impact Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-600 mb-2">
                {metric.metric}
              </div>
              <div className="text-lg font-semibold text-red-600 mb-1">
                {metric.before}
              </div>
              <div className="text-lg font-semibold text-green-600 mb-2">
                {metric.after}
              </div>
              <div className="text-sm font-bold text-blue-600">
                {metric.improvement}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Techniques */}
      {optimizationTechniques.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">
            {category.category}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {category.techniques.map((technique, techniqueIndex) => (
              <div
                key={techniqueIndex}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {technique.name}
                </h4>
                <p className="text-gray-600 mb-4 text-sm">
                  {technique.description}
                </p>
                <div className="bg-gray-100 rounded p-3 mb-3">
                  <code className="text-xs text-gray-800 break-all">
                    {technique.example}
                  </code>
                </div>
                <div className="text-sm font-medium text-green-600">
                  💡 {technique.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Implementation Steps */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-6">🛠️ Implementation Steps</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                Identify Performance Bottlenecks
              </h4>
              <p className="text-gray-600 text-sm">
                Use profiling tools to identify slow database queries, API
                calls, and frontend rendering issues.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                Implement Caching Strategy
              </h4>
              <p className="text-gray-600 text-sm">
                Add in-memory caching for frequently accessed data and implement
                Redis for distributed caching.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                Optimize Database Queries
              </h4>
              <p className="text-gray-600 text-sm">
                Add proper indexes, optimize SQL queries, and implement
                connection pooling.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                Implement Parallel Processing
              </h4>
              <p className="text-gray-600 text-sm">
                Use Promise.all() for concurrent API calls and implement request
                batching.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              5
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                Frontend Optimization
              </h4>
              <p className="text-gray-600 text-sm">
                Implement lazy loading, memoization, and code splitting for
                better user experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-green-800 mb-4">
          ✅ Performance Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              Backend Best Practices:
            </h4>
            <ul className="space-y-1 text-green-600 text-sm">
              <li>• Use database connection pooling</li>
              <li>• Implement proper error handling</li>
              <li>• Add request rate limiting</li>
              <li>• Use compression middleware</li>
              <li>• Monitor and log performance metrics</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              Frontend Best Practices:
            </h4>
            <ul className="space-y-1 text-green-600 text-sm">
              <li>• Implement proper loading states</li>
              <li>• Use React.memo for expensive components</li>
              <li>• Optimize bundle size with tree shaking</li>
              <li>• Implement proper error boundaries</li>
              <li>• Use service workers for offline caching</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tools and Resources */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">
          🛠️ Recommended Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">Monitoring:</h4>
            <ul className="space-y-1 text-blue-600 text-sm">
              <li>• New Relic</li>
              <li>• DataDog</li>
              <li>• Prometheus + Grafana</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">Profiling:</h4>
            <ul className="space-y-1 text-blue-600 text-sm">
              <li>• Chrome DevTools</li>
              <li>• React DevTools Profiler</li>
              <li>• Node.js --prof flag</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">Caching:</h4>
            <ul className="space-y-1 text-blue-600 text-sm">
              <li>• Redis</li>
              <li>• Memcached</li>
              <li>• CDN (CloudFlare, AWS CloudFront)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

