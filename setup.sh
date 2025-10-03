#!/bin/bash

# 🚀 Full-Stack Portfolio Setup Script
# This script sets up all projects in the repository

set -e

echo "🚀 Setting up Full-Stack Portfolio..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_success "Requirements check passed!"
}

# Setup Portfolio Builder
setup_portfolio_builder() {
    print_status "Setting up Portfolio Builder..."
    cd portfolio-builder
    
    if [ -f "package.json" ]; then
        npm install
        print_success "Portfolio Builder dependencies installed"
    else
        print_warning "Portfolio Builder package.json not found"
    fi
    
    cd ..
}

# Setup Forum CRUD
setup_forum_crud() {
    print_status "Setting up Forum CRUD..."
    cd forum-crud
    
    if [ -f "package.json" ]; then
        npm install
        print_success "Forum CRUD dependencies installed"
    else
        print_warning "Forum CRUD package.json not found"
    fi
    
    cd ..
}

# Setup OAuth Next.js
setup_oauth_nextjs() {
    print_status "Setting up OAuth Next.js..."
    cd oauth-nextjs
    
    if [ -f "package.json" ]; then
        npm install
        print_success "OAuth Next.js dependencies installed"
    else
        print_warning "OAuth Next.js package.json not found"
    fi
    
    cd ..
}

# Setup Performance Optimization
setup_performance_optimization() {
    print_status "Setting up Performance Optimization..."
    cd performance-optimization
    
    if [ -f "package.json" ]; then
        npm install
        print_success "Performance Optimization dependencies installed"
    else
        print_warning "Performance Optimization package.json not found"
    fi
    
    cd ..
}

# Create environment files
create_env_files() {
    print_status "Creating environment files..."
    
    # Forum CRUD
    if [ -f "forum-crud/.env.example" ] && [ ! -f "forum-crud/.env" ]; then
        cp forum-crud/.env.example forum-crud/.env
        print_success "Created forum-crud/.env"
    fi
    
    # OAuth Next.js
    if [ -f "oauth-nextjs/.env.example" ] && [ ! -f "oauth-nextjs/.env.local" ]; then
        cp oauth-nextjs/.env.example oauth-nextjs/.env.local
        print_success "Created oauth-nextjs/.env.local"
    fi
    
    # Performance Optimization
    if [ -f "performance-optimization/.env.example" ] && [ ! -f "performance-optimization/.env" ]; then
        cp performance-optimization/.env.example performance-optimization/.env
        print_success "Created performance-optimization/.env"
    fi
}

# Main setup function
main() {
    print_status "Starting Full-Stack Portfolio setup..."
    
    check_requirements
    create_env_files
    setup_portfolio_builder
    setup_forum_crud
    setup_oauth_nextjs
    setup_performance_optimization
    
    print_success "🎉 Setup completed successfully!"
    print_status "Next steps:"
    echo "1. Configure environment variables in .env files"
    echo "2. Set up PostgreSQL database for Forum CRUD"
    echo "3. Configure Google OAuth credentials"
    echo "4. Run individual projects:"
    echo "   - Portfolio Builder: cd portfolio-builder && npm start"
    echo "   - Forum CRUD: cd forum-crud && npm run dev"
    echo "   - OAuth Next.js: cd oauth-nextjs && npm run dev"
    echo "   - Performance Optimization: cd performance-optimization && npm run dev"
}

# Run main function
main
