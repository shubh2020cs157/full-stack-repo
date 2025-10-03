import { Router } from "express";
import { PostController } from "../controllers/postController";

const router: Router = Router();

// GET /api/posts - Get all posts with optional filters
router.get("/", PostController.getAllPosts);

// GET /api/posts/stats - Get post statistics
router.get("/stats", PostController.getPostStats);

// GET /api/posts/:id - Get post by ID
router.get("/:id", PostController.getPostById);

// GET /api/posts/slug/:slug - Get post by slug
router.get("/slug/:slug", PostController.getPostBySlug);

// POST /api/posts - Create new post
router.post("/", PostController.createPost);

// PUT /api/posts/:id - Update post
router.put("/:id", PostController.updatePost);

// DELETE /api/posts/:id - Delete post
router.delete("/:id", PostController.deletePost);

// POST /api/posts/:id/like - Like/Unlike post
router.post("/:id/like", PostController.toggleLike);

export default router;
