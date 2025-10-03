const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3008;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // allow 50 requests per 15 minutes, then...
  delayMs: 500, // begin adding 500ms of delay per request above 50
});

app.use("/api/", limiter);
app.use("/api/", speedLimiter);

// Simulate slow database operations (BEFORE optimization)
const simulateSlowDBQuery = (delay = 1500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000),
        data: `Database result ${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }, delay);
  });
};

// Simulate slow external API calls
const simulateSlowAPI = (delay = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000),
        externalData: `External API result ${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }, delay);
  });
};

// SLOW ROUTES (Before Optimization)
app.get("/api/slow/users", async (req, res) => {
  console.log("🔴 SLOW: Fetching users...");
  const startTime = Date.now();

  try {
    // Simulate slow database query
    const users = await simulateSlowDBQuery(1500);

    const endTime = Date.now();
    const duration = endTime - startTime;

    res.json({
      success: true,
      data: users,
      performance: {
        duration: `${duration}ms`,
        endpoint: "/api/slow/users",
        optimization: "NONE",
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/slow/posts", async (req, res) => {
  console.log("🔴 SLOW: Fetching posts...");
  const startTime = Date.now();

  try {
    const posts = await simulateSlowDBQuery(1200);

    const endTime = Date.now();
    const duration = endTime - startTime;

    res.json({
      success: true,
      data: posts,
      performance: {
        duration: `${duration}ms`,
        endpoint: "/api/slow/posts",
        optimization: "NONE",
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/slow/comments", async (req, res) => {
  console.log("🔴 SLOW: Fetching comments...");
  const startTime = Date.now();

  try {
    const comments = await simulateSlowDBQuery(1800);

    const endTime = Date.now();
    const duration = endTime - startTime;

    res.json({
      success: true,
      data: comments,
      performance: {
        duration: `${duration}ms`,
        endpoint: "/api/slow/comments",
        optimization: "NONE",
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/slow/external-data", async (req, res) => {
  console.log("🔴 SLOW: Fetching external data...");
  const startTime = Date.now();

  try {
    const externalData = await simulateSlowAPI(2000);

    const endTime = Date.now();
    const duration = endTime - startTime;

    res.json({
      success: true,
      data: externalData,
      performance: {
        duration: `${duration}ms`,
        endpoint: "/api/slow/external-data",
        optimization: "NONE",
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/slow/analytics", async (req, res) => {
  console.log("🔴 SLOW: Fetching analytics...");
  const startTime = Date.now();

  try {
    const analytics = await simulateSlowDBQuery(1600);

    const endTime = Date.now();
    const duration = endTime - startTime;

    res.json({
      success: true,
      data: analytics,
      performance: {
        duration: `${duration}ms`,
        endpoint: "/api/slow/analytics",
        optimization: "NONE",
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/slow/notifications", async (req, res) => {
  console.log("🔴 SLOW: Fetching notifications...");
  const startTime = Date.now();

  try {
    const notifications = await simulateSlowDBQuery(1400);

    const endTime = Date.now();
    const duration = endTime - startTime;

    res.json({
      success: true,
      data: notifications,
      performance: {
        duration: `${duration}ms`,
        endpoint: "/api/slow/notifications",
        optimization: "NONE",
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// OPTIMIZED ROUTES (After Optimization)
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

// Fast database simulation
const simulateFastDBQuery = (delay = 50) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000),
        data: `Fast database result ${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }, delay);
  });
};

// Fast external API simulation
const simulateFastAPI = (delay = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000),
        externalData: `Fast external API result ${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }, delay);
  });
};

// OPTIMIZED ROUTES
app.get("/api/fast/users", async (req, res) => {
  console.log("🟢 FAST: Fetching users...");
  const startTime = Date.now();

  try {
    // Check cache first
    const cacheKey = "users";
    let users = cache.get(cacheKey);

    if (!users) {
      // Cache miss - fetch from database
      users = await simulateFastDBQuery(50);
      cache.set(cacheKey, users);
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    res.json({
      success: true,
      data: users,
      performance: {
        duration: `${duration}ms`,
        endpoint: "/api/fast/users",
        optimization: "CACHING + FAST_DB",
        cacheHit: cache.get(cacheKey) !== undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/fast/posts", async (req, res) => {
  console.log("🟢 FAST: Fetching posts...");
  const startTime = Date.now();

  try {
    const cacheKey = "posts";
    let posts = cache.get(cacheKey);

    if (!posts) {
      posts = await simulateFastDBQuery(30);
      cache.set(cacheKey, posts);
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    res.json({
      success: true,
      data: posts,
      performance: {
        duration: `${duration}ms`,
        endpoint: "/api/fast/posts",
        optimization: "CACHING + FAST_DB",
        cacheHit: cache.get(cacheKey) !== undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/fast/comments", async (req, res) => {
  console.log("🟢 FAST: Fetching comments...");
  const startTime = Date.now();

  try {
    const cacheKey = "comments";
    let comments = cache.get(cacheKey);

    if (!comments) {
      comments = await simulateFastDBQuery(40);
      cache.set(cacheKey, comments);
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    res.json({
      success: true,
      data: comments,
      performance: {
        duration: `${duration}ms`,
        endpoint: "/api/fast/comments",
        optimization: "CACHING + FAST_DB",
        cacheHit: cache.get(cacheKey) !== undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/fast/external-data", async (req, res) => {
  console.log("🟢 FAST: Fetching external data...");
  const startTime = Date.now();

  try {
    const cacheKey = "external-data";
    let externalData = cache.get(cacheKey);

    if (!externalData) {
      externalData = await simulateFastAPI(100);
      cache.set(cacheKey, externalData);
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    res.json({
      success: true,
      data: externalData,
      performance: {
        duration: `${duration}ms`,
        endpoint: "/api/fast/external-data",
        optimization: "CACHING + FAST_API",
        cacheHit: cache.get(cacheKey) !== undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/fast/analytics", async (req, res) => {
  console.log("🟢 FAST: Fetching analytics...");
  const startTime = Date.now();

  try {
    const cacheKey = "analytics";
    let analytics = cache.get(cacheKey);

    if (!analytics) {
      analytics = await simulateFastDBQuery(60);
      cache.set(cacheKey, analytics);
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    res.json({
      success: true,
      data: analytics,
      performance: {
        duration: `${duration}ms`,
        endpoint: "/api/fast/analytics",
        optimization: "CACHING + FAST_DB",
        cacheHit: cache.get(cacheKey) !== undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/fast/notifications", async (req, res) => {
  console.log("🟢 FAST: Fetching notifications...");
  const startTime = Date.now();

  try {
    const cacheKey = "notifications";
    let notifications = cache.get(cacheKey);

    if (!notifications) {
      notifications = await simulateFastDBQuery(35);
      cache.set(cacheKey, notifications);
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    res.json({
      success: true,
      data: notifications,
      performance: {
        duration: `${duration}ms`,
        endpoint: "/api/fast/notifications",
        optimization: "CACHING + FAST_DB",
        cacheHit: cache.get(cacheKey) !== undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Batch endpoint for optimized parallel requests
app.get("/api/fast/batch", async (req, res) => {
  console.log("🟢 FAST: Batch request...");
  const startTime = Date.now();

  try {
    // Parallel execution of all requests
    const [users, posts, comments, externalData, analytics, notifications] =
      await Promise.all([
        fetch("http://localhost:3008/api/fast/users").then((r) => r.json()),
        fetch("http://localhost:3008/api/fast/posts").then((r) => r.json()),
        fetch("http://localhost:3008/api/fast/comments").then((r) => r.json()),
        fetch("http://localhost:3008/api/fast/external-data").then((r) =>
          r.json()
        ),
        fetch("http://localhost:3008/api/fast/analytics").then((r) => r.json()),
        fetch("http://localhost:3008/api/fast/notifications").then((r) =>
          r.json()
        ),
      ]);

    const endTime = Date.now();
    const duration = endTime - startTime;

    res.json({
      success: true,
      data: {
        users: users.data,
        posts: posts.data,
        comments: comments.data,
        externalData: externalData.data,
        analytics: analytics.data,
        notifications: notifications.data,
      },
      performance: {
        duration: `${duration}ms`,
        endpoint: "/api/fast/batch",
        optimization: "PARALLEL_EXECUTION + CACHING",
        totalRequests: 6,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Performance metrics endpoint
app.get("/api/performance/metrics", (req, res) => {
  res.json({
    cache: {
      keys: cache.keys().length,
      stats: cache.getStats(),
    },
    server: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Performance Optimization Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔴 Slow endpoints: http://localhost:${PORT}/api/slow/*`);
  console.log(`🟢 Fast endpoints: http://localhost:${PORT}/api/fast/*`);
  console.log(`📈 Batch endpoint: http://localhost:${PORT}/api/fast/batch`);
});

