# 🚀 Full-Stack Development Portfolio

A comprehensive showcase of modern full-stack development skills, featuring React, Node.js, Next.js, PostgreSQL, OAuth, performance optimization, and CI/CD pipelines.

## 📋 Projects Overview

This repository contains **5 complete projects** demonstrating advanced technical skills:

### 🎨 **1. Portfolio Builder**

- **Tech Stack**: React 18, TypeScript, Context API, Custom CSS
- **Features**: Profile picture upload, name input, background color picker
- **Port**: 3005
- **Demo**: Modern, user-friendly, minimalistic UI/UX

### 🗨️ **2. Forum CRUD API**

- **Tech Stack**: Node.js, Express, TypeScript, PostgreSQL
- **Features**: Complete CRUD operations, search, filtering, pagination
- **Port**: 3007
- **Database**: Advanced PostgreSQL schema with indexes and triggers

### 🔐 **3. OAuth Integration**

- **Tech Stack**: Next.js 14, NextAuth.js, Google OAuth 2.0
- **Features**: Google sign-in, protected routes, session management
- **Port**: 3006
- **Security**: JWT tokens, secure authentication flow

### ⚡ **4. Performance Optimization**

- **Tech Stack**: Next.js, Node.js, Express
- **Features**: API optimization, caching, parallel processing
- **Port**: 3008
- **Improvement**: 97% performance boost (9s → <1s)

### 🚀 **5. CI/CD Pipeline**

- **Tech Stack**: GitHub Actions, Docker, Vercel, AWS ECS
- **Features**: Automated testing, security scanning, deployment
- **Monitoring**: Prometheus, Grafana, Lighthouse CI

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Docker (optional)
- pnpm (recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shubh2020cs157/full-stack-portfolio.git
   cd full-stack-portfolio
   ```

2. **Install dependencies for all projects**

   ```bash
   # Portfolio Builder
   cd portfolio-builder && pnpm install && cd ..

   # Forum CRUD
   cd forum-crud && pnpm install && cd ..

   # OAuth Next.js
   cd oauth-nextjs && npm install && cd ..

   # Performance Optimization
   cd performance-optimization && npm install && cd ..
   ```

3. **Set up environment variables**

   ```bash
   # Copy example files
   cp forum-crud/.env.example forum-crud/.env
   cp oauth-nextjs/.env.example oauth-nextjs/.env.local
   cp performance-optimization/.env.example performance-optimization/.env
   ```

4. **Start development servers**

   ```bash
   # Terminal 1: Portfolio Builder
   cd portfolio-builder && pnpm start

   # Terminal 2: Forum CRUD
   cd forum-crud && pnpm dev

   # Terminal 3: OAuth Next.js
   cd oauth-nextjs && npm run dev

   # Terminal 4: Performance Optimization
   cd performance-optimization && npm run dev
   ```

## 📁 Project Structure

```
full-stack-portfolio/
├── portfolio-builder/          # React portfolio builder
├── forum-crud/                 # Node.js/PostgreSQL API
├── oauth-nextjs/              # Next.js OAuth integration
├── performance-optimization/   # Performance testing suite
├── .github/workflows/          # CI/CD pipelines
├── monitoring/                 # Prometheus & Grafana configs
├── aws/                       # AWS deployment configs
└── docker-compose.yml         # Multi-service development
```

## 🔧 Development

### Individual Project Setup

Each project has its own README with detailed setup instructions:

- [Portfolio Builder Setup](./portfolio-builder/README.md)
- [Forum CRUD Setup](./forum-crud/README.md)
- [OAuth Integration Setup](./oauth-nextjs/README.md)
- [Performance Optimization Setup](./performance-optimization/README.md)

### Docker Development

```bash
# Start all services with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🚀 Deployment

### CI/CD Pipeline

The repository includes comprehensive CI/CD pipelines:

- **Automated Testing**: Unit tests, integration tests, E2E tests
- **Security Scanning**: Snyk, Trivy, dependency vulnerability checks
- **Performance Testing**: Lighthouse CI, bundle analysis
- **Multi-Environment Deployment**: Dev, staging, production
- **Monitoring**: Prometheus metrics, Grafana dashboards

### Manual Deployment

1. **Frontend (Vercel)**

   ```bash
   # Portfolio Builder
   vercel --prod

   # OAuth Next.js
   vercel --prod
   ```

2. **Backend (AWS ECS)**
   ```bash
   # Deploy using AWS CLI
   aws ecs update-service --cluster production --service forum-crud
   ```

## 📊 Monitoring & Analytics

- **Performance**: Lighthouse CI reports
- **Security**: Snyk vulnerability reports
- **Metrics**: Prometheus + Grafana dashboards
- **Logs**: Centralized logging with structured data

## 🧪 Testing

```bash
# Run all tests
npm run test

# Performance testing
npm run test:performance

# Security scanning
npm run security:scan
```

## 📈 Performance Results

- **API Response Time**: 9+ seconds → <1 second (97% improvement)
- **Bundle Size**: Optimized with code splitting
- **Database Queries**: Reduced from 6 to 1 with joins
- **Caching**: 95% cache hit rate
- **Lighthouse Score**: 90+ across all metrics

## 🔒 Security Features

- **Authentication**: OAuth 2.0 with Google
- **Authorization**: JWT tokens, role-based access
- **Data Protection**: Input validation, SQL injection prevention
- **Dependency Scanning**: Automated vulnerability detection
- **Secrets Management**: Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This is a personal portfolio project for technical skills assessment. All rights reserved.

## 🎯 Skills Demonstrated

- **Frontend**: React 18, Next.js 14, TypeScript, Context API
- **Backend**: Node.js, Express, PostgreSQL, RESTful APIs
- **Authentication**: OAuth 2.0, NextAuth.js, JWT
- **Performance**: Caching, optimization, monitoring
- **DevOps**: Docker, CI/CD, GitHub Actions
- **Cloud**: AWS ECS, Vercel, monitoring
- **Security**: Vulnerability scanning, best practices
- **Testing**: Unit, integration, performance, security

## 📞 Contact

**Shubh** - [@shubh2020cs157](https://github.com/shubh2020cs157)

Project Link: [https://github.com/shubh2020cs157/full-stack-portfolio](https://github.com/shubh2020cs157/full-stack-portfolio)

---

⭐ **Star this repository if you found it helpful!**
