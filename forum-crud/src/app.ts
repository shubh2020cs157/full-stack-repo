import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import postRoutes from "./routes/postRoutes";
import { testConnection } from "./config/database";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Logging middleware
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
app.use("/api/posts", postRoutes);

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Forum CRUD API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      posts: "/api/posts",
      documentation: "/api/docs",
    },
  });
});

// API documentation endpoint
app.get("/api/docs", (req: Request, res: Response) => {
  res.json({
    title: "Forum CRUD API Documentation",
    version: "1.0.0",
    description:
      "A comprehensive REST API for forum post management with PostgreSQL",
    endpoints: {
      posts: {
        "GET /api/posts": {
          description: "Get all posts with optional filters",
          parameters: {
            category_id: "Filter by category ID (number)",
            author_id: "Filter by author ID (number)",
            status: "Filter by status (draft, published, archived)",
            search: "Search in title, content, and excerpt (string)",
            tags: "Filter by tags (comma-separated string)",
            is_pinned: "Filter by pinned status (boolean)",
            limit: "Number of posts per page (number, default: 20)",
            offset: "Number of posts to skip (number, default: 0)",
            sort_by:
              "Sort by field (created_at, updated_at, published_at, view_count, like_count)",
            sort_order: "Sort order (ASC, DESC, default: DESC)",
          },
          example:
            "/api/posts?category_id=1&status=published&limit=10&sort_by=created_at&sort_order=DESC",
        },
        "GET /api/posts/stats": {
          description: "Get post statistics",
          example: "/api/posts/stats",
        },
        "GET /api/posts/:id": {
          description: "Get post by ID",
          parameters: {
            id: "Post ID (number)",
          },
          example: "/api/posts/1",
        },
        "GET /api/posts/slug/:slug": {
          description: "Get post by slug",
          parameters: {
            slug: "Post slug (string)",
          },
          example: "/api/posts/slug/my-first-post",
        },
        "POST /api/posts": {
          description: "Create a new post",
          body: {
            title: "Post title (string, required)",
            content: "Post content (string, required)",
            excerpt: "Post excerpt (string, optional)",
            author_id: "Author ID (number, default: 1)",
            category_id: "Category ID (number, optional)",
            status:
              "Post status (draft, published, archived, default: published)",
            is_pinned: "Pin post (boolean, default: false)",
            is_locked: "Lock post (boolean, default: false)",
            featured_image_url: "Featured image URL (string, optional)",
            tags: "Post tags (array of strings, optional)",
            metadata: "Additional metadata (object, optional)",
          },
        },
        "PUT /api/posts/:id": {
          description: "Update an existing post",
          parameters: {
            id: "Post ID (number)",
          },
          body: "Same as POST /api/posts (all fields optional)",
        },
        "DELETE /api/posts/:id": {
          description: "Delete a post",
          parameters: {
            id: "Post ID (number)",
          },
        },
        "POST /api/posts/:id/like": {
          description: "Like or unlike a post",
          parameters: {
            id: "Post ID (number)",
          },
          body: {
            user_id: "User ID (number, default: 1)",
          },
        },
      },
    },
    examples: {
      createPost: {
        method: "POST",
        url: "/api/posts",
        body: {
          title: "My First Forum Post",
          content:
            "This is the content of my first forum post. It can contain multiple paragraphs and formatting.",
          excerpt: "A brief summary of the post content.",
          category_id: 1,
          tags: ["announcement", "welcome"],
          status: "published",
        },
      },
      searchPosts: {
        method: "GET",
        url: "/api/posts?search=javascript&category_id=2&limit=5",
      },
      getPostBySlug: {
        method: "GET",
        url: "/api/posts/slug/my-first-forum-post",
      },
    },
  });
});

// 404 handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Global error handler
app.use((error: any, req: Request, res: Response, next: any) => {
  console.error("Global error handler:", error);

  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error("❌ Failed to connect to database. Exiting...");
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
      console.log(`📝 Posts API: http://localhost:${PORT}/api/posts`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");
  process.exit(0);
});

export default app;

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}
