import { Request, Response } from "express";
import {
  PostModel,
  Post,
  CreatePostData,
  UpdatePostData,
  PostFilters,
} from "../models/Post";

export class PostController {
  // GET /api/posts - Get all posts with optional filters
  static async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const filters: PostFilters = {
        category_id: req.query.category_id
          ? parseInt(req.query.category_id as string)
          : undefined,
        author_id: req.query.author_id
          ? parseInt(req.query.author_id as string)
          : undefined,
        status: req.query.status as string,
        search: req.query.search as string,
        tags: req.query.tags
          ? (req.query.tags as string).split(",")
          : undefined,
        is_pinned: req.query.is_pinned
          ? req.query.is_pinned === "true"
          : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
        offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
        sort_by: req.query.sort_by as any,
        sort_order: req.query.sort_order as "ASC" | "DESC",
      };

      const posts = await PostModel.findAll(filters);
      const totalCount = await PostModel.count(filters);

      res.json({
        success: true,
        data: posts,
        pagination: {
          total: totalCount,
          limit: filters.limit || 20,
          offset: filters.offset || 0,
          hasMore: (filters.offset || 0) + (filters.limit || 20) < totalCount,
        },
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch posts",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      });
    }
  }

  // GET /api/posts/:id - Get post by ID
  static async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: "Invalid post ID",
        });
        return;
      }

      const post = await PostModel.findById(id);

      if (!post) {
        res.status(404).json({
          success: false,
          message: "Post not found",
        });
        return;
      }

      // Increment view count
      await PostModel.incrementViewCount(id);

      res.json({
        success: true,
        data: post,
      });
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch post",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      });
    }
  }

  // GET /api/posts/slug/:slug - Get post by slug
  static async getPostBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;

      const post = await PostModel.findBySlug(slug);

      if (!post) {
        res.status(404).json({
          success: false,
          message: "Post not found",
        });
        return;
      }

      // Increment view count
      await PostModel.incrementViewCount(post.id);

      res.json({
        success: true,
        data: post,
      });
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch post",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      });
    }
  }

  // POST /api/posts - Create new post
  static async createPost(req: Request, res: Response): Promise<void> {
    try {
      const postData: CreatePostData = {
        title: req.body.title,
        content: req.body.content,
        excerpt: req.body.excerpt,
        author_id: req.body.author_id || 1, // In real app, get from authenticated user
        category_id: req.body.category_id,
        status: req.body.status || "published",
        is_pinned: req.body.is_pinned || false,
        is_locked: req.body.is_locked || false,
        featured_image_url: req.body.featured_image_url,
        tags: req.body.tags,
        metadata: req.body.metadata,
      };

      // Validate required fields
      if (!postData.title || !postData.content) {
        res.status(400).json({
          success: false,
          message: "Title and content are required",
        });
        return;
      }

      const post = await PostModel.create(postData);

      res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post,
      });
    } catch (error) {
      console.error("Error creating post:", error);

      // Handle unique constraint violations
      if ((error as any).code === "23505") {
        res.status(409).json({
          success: false,
          message: "A post with this title already exists",
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Failed to create post",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      });
    }
  }

  // PUT /api/posts/:id - Update post
  static async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: "Invalid post ID",
        });
        return;
      }

      const updateData: UpdatePostData = {
        title: req.body.title,
        content: req.body.content,
        excerpt: req.body.excerpt,
        category_id: req.body.category_id,
        status: req.body.status,
        is_pinned: req.body.is_pinned,
        is_locked: req.body.is_locked,
        featured_image_url: req.body.featured_image_url,
        tags: req.body.tags,
        metadata: req.body.metadata,
      };

      // Remove undefined values
      Object.keys(updateData).forEach((key) => {
        if (updateData[key as keyof UpdatePostData] === undefined) {
          delete updateData[key as keyof UpdatePostData];
        }
      });

      const post = await PostModel.update(id, updateData);

      if (!post) {
        res.status(404).json({
          success: false,
          message: "Post not found",
        });
        return;
      }

      res.json({
        success: true,
        message: "Post updated successfully",
        data: post,
      });
    } catch (error) {
      console.error("Error updating post:", error);

      // Handle unique constraint violations
      if ((error as any).code === "23505") {
        res.status(409).json({
          success: false,
          message: "A post with this title already exists",
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Failed to update post",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      });
    }
  }

  // DELETE /api/posts/:id - Delete post
  static async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: "Invalid post ID",
        });
        return;
      }

      const deleted = await PostModel.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "Post not found",
        });
        return;
      }

      res.json({
        success: true,
        message: "Post deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete post",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      });
    }
  }

  // GET /api/posts/:id/like - Like/Unlike post
  static async toggleLike(req: Request, res: Response): Promise<void> {
    try {
      const postId = parseInt(req.params.id);
      const userId = req.body.user_id || 1; // In real app, get from authenticated user

      if (isNaN(postId)) {
        res.status(400).json({
          success: false,
          message: "Invalid post ID",
        });
        return;
      }

      // Check if post exists
      const post = await PostModel.findById(postId);
      if (!post) {
        res.status(404).json({
          success: false,
          message: "Post not found",
        });
        return;
      }

      // Toggle like (this would require a separate Like model in a real implementation)
      // For now, we'll just update the like count
      await PostModel.updateLikeCount(postId);

      const updatedPost = await PostModel.findById(postId);

      res.json({
        success: true,
        message: "Like toggled successfully",
        data: updatedPost,
      });
    } catch (error) {
      console.error("Error toggling like:", error);
      res.status(500).json({
        success: false,
        message: "Failed to toggle like",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      });
    }
  }

  // GET /api/posts/stats - Get post statistics
  static async getPostStats(req: Request, res: Response): Promise<void> {
    try {
      const totalPosts = await PostModel.count();
      const publishedPosts = await PostModel.count({ status: "published" });
      const draftPosts = await PostModel.count({ status: "draft" });
      const pinnedPosts = await PostModel.count({ is_pinned: true });

      res.json({
        success: true,
        data: {
          total: totalPosts,
          published: publishedPosts,
          draft: draftPosts,
          pinned: pinnedPosts,
        },
      });
    } catch (error) {
      console.error("Error fetching post stats:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch post statistics",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      });
    }
  }
}
