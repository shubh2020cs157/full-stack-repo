# Forum CRUD API

A comprehensive Node.js/Express REST API for forum post management with PostgreSQL database. This API provides full CRUD operations for forum posts with advanced filtering, searching, and pagination capabilities.

## 🚀 Features

- **Complete CRUD Operations** for forum posts
- **Advanced Filtering** by category, author, status, tags, and more
- **Full-Text Search** across post titles, content, and excerpts
- **Pagination** with configurable limits and offsets
- **Post Statistics** and analytics
- **Slug-based URLs** for SEO-friendly post access
- **View Count Tracking** with automatic increments
- **Like System** for posts
- **Comprehensive Error Handling** with detailed error messages
- **TypeScript Support** for type safety
- **Security Middleware** with Helmet and CORS
- **Request Logging** with Morgan
- **Database Connection Pooling** for optimal performance

## 🛠️ Tech Stack

- **Node.js** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** database
- **pg** (node-postgres) for database connectivity
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Morgan** for HTTP request logging
- **dotenv** for environment configuration

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- pnpm (recommended) or npm

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd forum-crud
pnpm install
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb forum_db

# Run the schema
psql -U postgres -d forum_db -f sql/schema.sql

# Or use the npm script
pnpm run db:setup
```

### 3. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your database credentials
```

### 4. Start Development Server

```bash
# Development mode with hot reload
pnpm run dev

# Or build and start production
pnpm run build
pnpm start
```

The API will be available at `http://localhost:3007`

## 📚 API Documentation

### Base URL

```
http://localhost:3007/api
```

### Endpoints

#### Posts

| Method | Endpoint            | Description                         |
| ------ | ------------------- | ----------------------------------- |
| GET    | `/posts`            | Get all posts with optional filters |
| GET    | `/posts/stats`      | Get post statistics                 |
| GET    | `/posts/:id`        | Get post by ID                      |
| GET    | `/posts/slug/:slug` | Get post by slug                    |
| POST   | `/posts`            | Create new post                     |
| PUT    | `/posts/:id`        | Update existing post                |
| DELETE | `/posts/:id`        | Delete post                         |
| POST   | `/posts/:id/like`   | Like/unlike post                    |

### Query Parameters for GET /posts

| Parameter     | Type    | Description                                                               | Example                  |
| ------------- | ------- | ------------------------------------------------------------------------- | ------------------------ |
| `category_id` | number  | Filter by category ID                                                     | `?category_id=1`         |
| `author_id`   | number  | Filter by author ID                                                       | `?author_id=1`           |
| `status`      | string  | Filter by status (draft, published, archived)                             | `?status=published`      |
| `search`      | string  | Search in title, content, excerpt                                         | `?search=javascript`     |
| `tags`        | string  | Filter by tags (comma-separated)                                          | `?tags=tech,programming` |
| `is_pinned`   | boolean | Filter by pinned status                                                   | `?is_pinned=true`        |
| `limit`       | number  | Posts per page (default: 20)                                              | `?limit=10`              |
| `offset`      | number  | Posts to skip (default: 0)                                                | `?offset=20`             |
| `sort_by`     | string  | Sort field (created_at, updated_at, published_at, view_count, like_count) | `?sort_by=created_at`    |
| `sort_order`  | string  | Sort order (ASC, DESC)                                                    | `?sort_order=DESC`       |

### Request/Response Examples

#### Create Post

```bash
POST /api/posts
Content-Type: application/json

{
  "title": "My First Forum Post",
  "content": "This is the content of my first forum post...",
  "excerpt": "A brief summary of the post content.",
  "category_id": 1,
  "tags": ["announcement", "welcome"],
  "status": "published"
}
```

#### Get Posts with Filters

```bash
GET /api/posts?category_id=1&status=published&limit=10&sort_by=created_at&sort_order=DESC
```

#### Update Post

```bash
PUT /api/posts/1
Content-Type: application/json

{
  "title": "Updated Post Title",
  "content": "Updated content...",
  "is_pinned": true
}
```

## 🗄️ Database Schema

The API uses the following main tables:

- **users** - User accounts and profiles
- **categories** - Post categories
- **posts** - Forum posts with full metadata
- **comments** - Post comments (nested structure)
- **likes** - Post and comment likes

### Key Features:

- **Automatic timestamps** with triggers
- **Full-text search indexes** for performance
- **Foreign key constraints** for data integrity
- **JSONB metadata** for extensibility
- **Array fields** for tags
- **Slug generation** for SEO-friendly URLs

## 🔧 Development

### Project Structure

```
src/
├── config/
│   └── database.ts          # Database configuration and connection
├── controllers/
│   └── postController.ts    # Post CRUD operations
├── models/
│   └── Post.ts             # Post model and interfaces
├── routes/
│   └── postRoutes.ts       # Post API routes
└── app.ts                  # Express application setup

sql/
└── schema.sql              # Database schema and sample data
```

### Available Scripts

```bash
# Development
pnpm run dev              # Start with nodemon
pnpm run build            # Build TypeScript
pnpm start                # Start production server

# Database
pnpm run db:setup         # Setup database schema
pnpm run db:reset         # Reset database completely
```

### Environment Variables

```env
# Server
PORT=3007
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=forum_db
DB_USER=postgres
DB_PASSWORD=password

# CORS
CORS_ORIGIN=http://localhost:3007
```

## 🧪 Testing the API

### Using curl

```bash
# Get all posts
curl http://localhost:3007/api/posts

# Create a new post
curl -X POST http://localhost:3007/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "content": "This is a test post content",
    "category_id": 1
  }'

# Get post by ID
curl http://localhost:3007/api/posts/1

# Search posts
curl "http://localhost:3007/api/posts?search=test&limit=5"
```

### Using Postman

Import the following collection or create requests manually:

1. **GET** `{{baseUrl}}/api/posts` - Get all posts
2. **POST** `{{baseUrl}}/api/posts` - Create post
3. **GET** `{{baseUrl}}/api/posts/1` - Get post by ID
4. **PUT** `{{baseUrl}}/api/posts/1` - Update post
5. **DELETE** `{{baseUrl}}/api/posts/1` - Delete post

## 📊 API Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "pagination": {
    "total": 100,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information (development only)"
}
```

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** configuration for cross-origin requests
- **Input validation** and sanitization
- **SQL injection protection** with parameterized queries
- **Error handling** without sensitive data exposure
- **Rate limiting** ready (can be added)

## 🚀 Production Deployment

### Environment Setup

```bash
# Set production environment
export NODE_ENV=production

# Configure production database
export DB_HOST=your-production-db-host
export DB_PASSWORD=your-secure-password
```

### Build and Deploy

```bash
# Build the application
pnpm run build

# Start production server
pnpm start
```

### Docker Support (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3007
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Check the API documentation at `/api/docs`
- Review the database schema in `sql/schema.sql`
- Check the health endpoint at `/health`

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Comment system with nested replies
- [ ] File upload for post images
- [ ] Real-time notifications
- [ ] Advanced search with Elasticsearch
- [ ] API rate limiting
- [ ] Caching with Redis
- [ ] Unit and integration tests
- [ ] API versioning
- [ ] GraphQL endpoint
