# 🚀 Complete Setup Guide: Google OAuth with Next.js

This guide will walk you through setting up Google OAuth authentication with NextAuth.js step by step.

## 📋 Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Google account for OAuth setup
- [ ] Code editor (VS Code recommended)
- [ ] Git installed

## 🔧 Step 1: Project Setup

### 1.1 Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd oauth-nextjs

# Install dependencies
npm install
```

### 1.2 Verify Installation

```bash
# Check if everything is installed correctly
npm run build
```

## 🔑 Step 2: Google Cloud Console Setup

### 2.1 Create Google Cloud Project

1. **Go to Google Cloud Console**

   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click "Select a project" dropdown
   - Click "New Project"
   - Name: `oauth-nextjs-demo`
   - Click "Create"

### 2.2 Enable Google+ API

1. **Navigate to APIs & Services**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click on it and press "Enable"

### 2.3 Configure OAuth Consent Screen

1. **Go to OAuth Consent Screen**

   - Navigate to "APIs & Services" > "OAuth consent screen"

2. **Choose User Type**

   - Select "External" (unless you have Google Workspace)
   - Click "Create"

3. **Fill App Information**

   ```
   App name: OAuth Next.js Demo
   User support email: your-email@gmail.com
   Developer contact information: your-email@gmail.com
   ```

4. **Add Scopes**

   - Click "Add or Remove Scopes"
   - Add these scopes:
     - `../auth/userinfo.email`
     - `../auth/userinfo.profile`
     - `openid`
   - Click "Update"

5. **Add Test Users** (for development)
   - Click "Add Users"
   - Add your email address
   - Click "Save"

### 2.4 Create OAuth 2.0 Credentials

1. **Go to Credentials**

   - Navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"

2. **Configure OAuth Client**

   ```
   Application type: Web application
   Name: OAuth Next.js Demo Client

   Authorized JavaScript origins:
   - http://localhost:3000

   Authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google
   ```

3. **Save Credentials**
   - Click "Create"
   - **IMPORTANT**: Copy the Client ID and Client Secret
   - Save them securely (you'll need them next)

## 🔐 Step 3: Environment Configuration

### 3.1 Create Environment File

```bash
# Copy the example file
cp .env.example .env.local
```

### 3.2 Configure Environment Variables

Edit `.env.local` with your actual values:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-nextauth-secret-key-here

# Google OAuth Configuration (from Step 2.4)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Database Configuration (Optional - for user persistence)
DATABASE_URL="postgresql://username:password@localhost:5432/oauth_nextjs"

# JWT Configuration
JWT_SECRET=your-jwt-secret-key-here

# Application Configuration
NODE_ENV=development
```

### 3.3 Generate Secure Secrets

```bash
# Generate NextAuth secret
openssl rand -base64 32

# Generate JWT secret
openssl rand -base64 32
```

**Replace the placeholder values in `.env.local` with the generated secrets.**

## 🗄️ Step 4: Database Setup (Optional)

### 4.1 Install PostgreSQL

**macOS (using Homebrew):**

```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**

- Download from: https://www.postgresql.org/download/windows/
- Follow the installation wizard

### 4.2 Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE oauth_nextjs;

# Create user (optional)
CREATE USER oauth_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE oauth_nextjs TO oauth_user;

# Exit
\q
```

### 4.3 Update Environment Variables

Update your `.env.local` with the correct database URL:

```env
DATABASE_URL="postgresql://oauth_user:your_password@localhost:5432/oauth_nextjs"
```

### 4.4 Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) View your data
npx prisma studio
```

## 🚀 Step 5: Start the Application

### 5.1 Start Development Server

```bash
npm run dev
```

### 5.2 Verify Setup

1. **Open Browser**

   - Go to: http://localhost:3000
   - You should see the OAuth Next.js Demo page

2. **Test Authentication**

   - Click "Sign In with Google"
   - Complete the Google OAuth flow
   - You should be redirected to the dashboard

3. **Test Protected API**
   - In the dashboard, click "Test Protected API"
   - You should see a success response with your user data

## 🧪 Step 6: Testing & Verification

### 6.1 Authentication Flow Test

```bash
# Test 1: Unauthenticated access
curl http://localhost:3000/api/protected
# Expected: 401 Unauthorized

# Test 2: Check if server is running
curl http://localhost:3000
# Expected: HTML page with OAuth demo
```

### 6.2 Manual Testing Checklist

- [ ] Home page loads correctly
- [ ] "Sign In with Google" button works
- [ ] Google OAuth consent screen appears
- [ ] After consent, redirects to dashboard
- [ ] Dashboard shows user information
- [ ] "Test Protected API" button works
- [ ] Sign out functionality works
- [ ] After sign out, redirects to home page

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Issue 1: "Invalid redirect URI"

**Error:** `Error 400: redirect_uri_mismatch`

**Solution:**

1. Check Google Cloud Console
2. Ensure redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`
3. No trailing slashes or extra characters

#### Issue 2: "NEXTAUTH_SECRET not set"

**Error:** `NEXTAUTH_SECRET environment variable is not set`

**Solution:**

```bash
# Generate a new secret
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET=your-generated-secret-here
```

#### Issue 3: "Access blocked: This app's request is invalid"

**Error:** Google shows access blocked message

**Solution:**

1. Go to OAuth consent screen in Google Cloud Console
2. Add your email to "Test users"
3. Make sure the app is in "Testing" mode

#### Issue 4: Database connection errors

**Error:** `PrismaClientInitializationError`

**Solution:**

1. Check if PostgreSQL is running
2. Verify DATABASE_URL in .env.local
3. Test connection: `psql $DATABASE_URL`

#### Issue 5: TypeScript errors

**Error:** Various TypeScript compilation errors

**Solution:**

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript configuration
npx tsc --noEmit
```

## 🔧 Advanced Configuration

### Custom OAuth Scopes

Edit `src/lib/auth.ts` to add more scopes:

```typescript
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  authorization: {
    params: {
      scope: "openid email profile https://www.googleapis.com/auth/calendar.readonly",
    },
  },
}),
```

### Custom Session Data

Add custom data to sessions:

```typescript
callbacks: {
  async session({ session, user, token }) {
    // Add custom properties
    session.user.role = "admin";
    session.user.permissions = ["read", "write"];
    return session;
  },
}
```

### Multiple OAuth Providers

Add more providers to `src/lib/auth.ts`:

```typescript
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

providers: [
  GoogleProvider({...}),
  GitHubProvider({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  }),
  DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  }),
],
```

## 🚀 Production Deployment

### Vercel Deployment

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

3. **Set Environment Variables**

   - Go to Vercel dashboard
   - Add all environment variables from `.env.local`
   - Update `NEXTAUTH_URL` to your production domain

4. **Update Google OAuth Settings**
   - Add production redirect URI: `https://yourdomain.com/api/auth/callback/google`
   - Update authorized origins

### Environment Variables for Production

```env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-client-secret
DATABASE_URL=your-production-database-url
NODE_ENV=production
```

## ✅ Final Checklist

Before considering your setup complete:

- [ ] Google Cloud Console project created
- [ ] OAuth 2.0 credentials configured
- [ ] Environment variables set correctly
- [ ] Development server starts without errors
- [ ] Authentication flow works end-to-end
- [ ] Protected routes are accessible only when authenticated
- [ ] API endpoints return correct responses
- [ ] Sign out functionality works
- [ ] Database connection works (if using database)
- [ ] TypeScript compilation passes
- [ ] No console errors in browser

## 🎉 Congratulations!

You've successfully set up Google OAuth authentication with NextAuth.js!

**Next Steps:**

- Customize the UI to match your brand
- Add more OAuth providers
- Implement user roles and permissions
- Add more protected routes
- Deploy to production

**Resources:**

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Authentication Guide](https://nextjs.org/docs/authentication)

Happy coding! 🚀
