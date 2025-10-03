import { query } from "../config/database";

export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  author_id: number;
  category_id?: number;
  status: "draft" | "published" | "archived";
  is_pinned: boolean;
  is_locked: boolean;
  view_count: number;
  like_count: number;
  comment_count: number;
  featured_image_url?: string;
  tags?: string[];
  metadata?: any;
  created_at: Date;
  updated_at: Date;
  published_at?: Date;
  // Joined fields
  author_username?: string;
  author_avatar_url?: string;
  category_name?: string;
  category_color?: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  excerpt?: string;
  author_id: number;
  category_id?: number;
  status?: "draft" | "published" | "archived";
  is_pinned?: boolean;
  is_locked?: boolean;
  featured_image_url?: string;
  tags?: string[];
  metadata?: any;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  excerpt?: string;
  category_id?: number;
  status?: "draft" | "published" | "archived";
  is_pinned?: boolean;
  is_locked?: boolean;
  featured_image_url?: string;
  tags?: string[];
  metadata?: any;
}

export interface PostFilters {
  category_id?: number;
  author_id?: number;
  status?: string;
  search?: string;
  tags?: string[];
  is_pinned?: boolean;
  limit?: number;
  offset?: number;
  sort_by?:
    | "created_at"
    | "updated_at"
    | "published_at"
    | "view_count"
    | "like_count";
  sort_order?: "ASC" | "DESC";
}

export class PostModel {
  // Generate slug from title
  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  // Create a new post
  static async create(data: CreatePostData): Promise<Post> {
    const slug = this.generateSlug(data.title);
    const published_at = data.status === "published" ? new Date() : null;

    const result = await query(
      `INSERT INTO posts (
        title, content, excerpt, slug, author_id, category_id, status,
        is_pinned, is_locked, featured_image_url, tags, metadata, published_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        data.title,
        data.content,
        data.excerpt,
        slug,
        data.author_id,
        data.category_id,
        data.status || "published",
        data.is_pinned || false,
        data.is_locked || false,
        data.featured_image_url,
        data.tags,
        data.metadata ? JSON.stringify(data.metadata) : null,
        published_at,
      ]
    );

    return result.rows[0];
  }

  // Get all posts with filters
  static async findAll(filters: PostFilters = {}): Promise<Post[]> {
    let whereConditions: string[] = [];
    let queryParams: any[] = [];
    let paramCount = 0;

    // Build WHERE conditions
    if (filters.category_id) {
      paramCount++;
      whereConditions.push(`p.category_id = $${paramCount}`);
      queryParams.push(filters.category_id);
    }

    if (filters.author_id) {
      paramCount++;
      whereConditions.push(`p.author_id = $${paramCount}`);
      queryParams.push(filters.author_id);
    }

    if (filters.status) {
      paramCount++;
      whereConditions.push(`p.status = $${paramCount}`);
      queryParams.push(filters.status);
    }

    if (filters.search) {
      paramCount++;
      whereConditions.push(`(
        p.title ILIKE $${paramCount} OR 
        p.content ILIKE $${paramCount} OR 
        p.excerpt ILIKE $${paramCount}
      )`);
      queryParams.push(`%${filters.search}%`);
    }

    if (filters.tags && filters.tags.length > 0) {
      paramCount++;
      whereConditions.push(`p.tags && $${paramCount}`);
      queryParams.push(filters.tags);
    }

    if (filters.is_pinned !== undefined) {
      paramCount++;
      whereConditions.push(`p.is_pinned = $${paramCount}`);
      queryParams.push(filters.is_pinned);
    }

    // Build ORDER BY clause
    const sortBy = filters.sort_by || "created_at";
    const sortOrder = filters.sort_order || "DESC";
    const orderBy = `ORDER BY p.${sortBy} ${sortOrder}`;

    // Build LIMIT and OFFSET
    const limit = filters.limit || 20;
    const offset = filters.offset || 0;
    paramCount++;
    queryParams.push(limit);
    paramCount++;
    queryParams.push(offset);

    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    const queryText = `
      SELECT 
        p.*,
        u.username as author_username,
        u.avatar_url as author_avatar_url,
        c.name as category_name,
        c.color as category_color
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      ${whereClause}
      ${orderBy}
      LIMIT $${paramCount - 1} OFFSET $${paramCount}
    `;

    const result = await query(queryText, queryParams);
    return result.rows;
  }

  // Get post by ID
  static async findById(id: number): Promise<Post | null> {
    const result = await query(
      `SELECT 
        p.*,
        u.username as author_username,
        u.avatar_url as author_avatar_url,
        c.name as category_name,
        c.color as category_color
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1`,
      [id]
    );

    return result.rows[0] || null;
  }

  // Get post by slug
  static async findBySlug(slug: string): Promise<Post | null> {
    const result = await query(
      `SELECT 
        p.*,
        u.username as author_username,
        u.avatar_url as author_avatar_url,
        c.name as category_name,
        c.color as category_color
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.slug = $1`,
      [slug]
    );

    return result.rows[0] || null;
  }

  // Update post
  static async update(id: number, data: UpdatePostData): Promise<Post | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 0;

    // Build dynamic update query
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        paramCount++;
        fields.push(`${key} = $${paramCount}`);
        values.push(key === "metadata" ? JSON.stringify(value) : value);
      }
    });

    if (fields.length === 0) {
      return this.findById(id);
    }

    // Update slug if title is being updated
    if (data.title) {
      paramCount++;
      fields.push(`slug = $${paramCount}`);
      values.push(this.generateSlug(data.title));
    }

    // Set published_at if status is being changed to published
    if (data.status === "published") {
      paramCount++;
      fields.push(`published_at = $${paramCount}`);
      values.push(new Date());
    }

    paramCount++;
    values.push(id);

    const result = await query(
      `UPDATE posts SET ${fields.join(
        ", "
      )} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0] || null;
  }

  // Delete post
  static async delete(id: number): Promise<boolean> {
    const result = await query("DELETE FROM posts WHERE id = $1", [id]);
    return result.rowCount > 0;
  }

  // Increment view count
  static async incrementViewCount(id: number): Promise<void> {
    await query("UPDATE posts SET view_count = view_count + 1 WHERE id = $1", [
      id,
    ]);
  }

  // Update like count
  static async updateLikeCount(id: number): Promise<void> {
    await query(
      `UPDATE posts SET like_count = (
        SELECT COUNT(*) FROM likes WHERE post_id = $1
      ) WHERE id = $1`,
      [id]
    );
  }

  // Update comment count
  static async updateCommentCount(id: number): Promise<void> {
    await query(
      `UPDATE posts SET comment_count = (
        SELECT COUNT(*) FROM comments WHERE post_id = $1 AND is_deleted = false
      ) WHERE id = $1`,
      [id]
    );
  }

  // Get post count by filters
  static async count(filters: PostFilters = {}): Promise<number> {
    let whereConditions: string[] = [];
    let queryParams: any[] = [];
    let paramCount = 0;

    // Build WHERE conditions (same logic as findAll)
    if (filters.category_id) {
      paramCount++;
      whereConditions.push(`category_id = $${paramCount}`);
      queryParams.push(filters.category_id);
    }

    if (filters.author_id) {
      paramCount++;
      whereConditions.push(`author_id = $${paramCount}`);
      queryParams.push(filters.author_id);
    }

    if (filters.status) {
      paramCount++;
      whereConditions.push(`status = $${paramCount}`);
      queryParams.push(filters.status);
    }

    if (filters.search) {
      paramCount++;
      whereConditions.push(`(
        title ILIKE $${paramCount} OR 
        content ILIKE $${paramCount} OR 
        excerpt ILIKE $${paramCount}
      )`);
      queryParams.push(`%${filters.search}%`);
    }

    if (filters.tags && filters.tags.length > 0) {
      paramCount++;
      whereConditions.push(`tags && $${paramCount}`);
      queryParams.push(filters.tags);
    }

    if (filters.is_pinned !== undefined) {
      paramCount++;
      whereConditions.push(`is_pinned = $${paramCount}`);
      queryParams.push(filters.is_pinned);
    }

    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    const result = await query(
      `SELECT COUNT(*) as count FROM posts ${whereClause}`,
      queryParams
    );
    return parseInt(result.rows[0].count);
  }
}
