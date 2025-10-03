# Google OAuth with Next.js & NextAuth.js

A complete implementation of Google OAuth authentication using NextAuth.js, TypeScript, and Next.js 14 with App Router. This project demonstrates secure authentication, protected routes, and session management.

## 🚀 Features

- **Google OAuth 2.0** authentication with NextAuth.js
- **TypeScript** support with full type safety
- **Protected Routes** with server-side session validation
- **Session Management** with JWT and database persistence
- **Custom Sign-in Pages** with beautiful UI
- **Protected API Endpoints** with authentication middleware
- **Responsive Design** with Tailwind CSS
- **Database Integration** with Prisma (optional)

## 🛠️ Tech Stack

- **Next.js 14** with App Router
- **NextAuth.js** for authentication
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Prisma** for database (optional)
- **PostgreSQL** for data persistence (optional)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Cloud Console account (for OAuth credentials)
- PostgreSQL database (optional, for user persistence)

## 🔧 Step-by-Step Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd oauth-nextjs
npm install
```

### 2. Google Cloud Console Setup

#### 2.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)

#### 2.2 Create OAuth 2.0 Credentials

1. Navigate to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. Configure the OAuth consent screen if prompted
4. Select **Web application** as the application type
5. Add authorized redirect URIs:
   - `http://localhost:3006/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy the **Client ID** and **Client Secret**

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3006
NEXTAUTH_SECRET=your-super-secret-nextauth-secret-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Database Configuration (Optional)
DATABASE_URL="postgresql://username:password@localhost:5432/oauth_nextjs"

# JWT Configuration
JWT_SECRET=your-jwt-secret-key-here

# Application Configuration
NODE_ENV=development
```

**Important:** Generate secure secrets:

```bash
# Generate NextAuth secret
openssl rand -base64 32

# Generate JWT secret
openssl rand -base64 32
```

### 4. Database Setup (Optional)

If you want to persist user data:

```bash
# Install Prisma CLI
npm install -g prisma

# Initialize Prisma
npx prisma init

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:3006` to see the application.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts          # NextAuth API routes
│   │   └── protected/
│   │       └── route.ts              # Protected API endpoint
│   ├── auth/
│   │   └── signin/
│   │       └── page.tsx              # Custom sign-in page
│   ├── dashboard/
│   │   └── page.tsx                  # Protected dashboard
│   ├── layout.tsx                    # Root layout with SessionProvider
│   └── page.tsx                      # Home page
├── components/
│   ├── AuthButton.tsx                # Authentication button component
│   ├── ProtectedRoute.tsx            # Route protection wrapper
│   └── SessionProvider.tsx           # NextAuth session provider
├── lib/
│   └── auth.ts                       # NextAuth configuration
└── types/
    └── next-auth.d.ts                # NextAuth type extensions

prisma/
└── schema.prisma                     # Database schema (optional)
```

## 🔐 Authentication Flow

### 1. User Authentication Process

```mermaid
sequenceDiagram
    participant U as User
    participant A as App
    participant G as Google
    participant N as NextAuth

    U->>A: Click "Sign In with Google"
    A->>N: Redirect to /api/auth/signin/google
    N->>G: Redirect to Google OAuth
    G->>U: Show Google consent screen
    U->>G: Grant permissions
    G->>N: Return with authorization code
    N->>G: Exchange code for tokens
    G->>N: Return access & refresh tokens
    N->>A: Create session & redirect to dashboard
    A->>U: Show protected content
```

### 2. Session Management

- **JWT Strategy**: Sessions are stored as JWT tokens
- **Automatic Refresh**: Tokens are automatically refreshed
- **Server-side Validation**: Sessions are validated on the server
- **Secure Cookies**: Session data is stored in secure HTTP-only cookies

## 🛡️ Security Features

### 1. Authentication Security

- **OAuth 2.0**: Industry-standard authentication protocol
- **HTTPS Only**: Secure cookie transmission
- **CSRF Protection**: Built-in CSRF protection
- **Session Validation**: Server-side session verification

### 2. Route Protection

```typescript
// Client-side protection
<ProtectedRoute>
  <DashboardContent />
</ProtectedRoute>;

// Server-side protection
const session = await getServerSession(authOptions);
if (!session) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

### 3. API Security

- **Middleware Protection**: API routes are protected with session validation
- **Type Safety**: Full TypeScript support for request/response types
- **Error Handling**: Comprehensive error handling and logging

## 🎯 Usage Examples

### 1. Basic Authentication

```typescript
// Check authentication status
const { data: session, status } = useSession();

if (status === "loading") return <p>Loading...</p>;
if (status === "unauthenticated") return <p>Access Denied</p>;

return <p>Signed in as {session.user.email}</p>;
```

### 2. Sign In/Out

```typescript
import { signIn, signOut } from "next-auth/react";

// Sign in
await signIn("google", { callbackUrl: "/dashboard" });

// Sign out
await signOut({ callbackUrl: "/" });
```

### 3. Protected API Calls

```typescript
// Client-side API call
const response = await fetch("/api/protected", {
  headers: {
    "Content-Type": "application/json",
  },
});
const data = await response.json();
```

### 4. Server-side Session Access

```typescript
// In API routes
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user: session.user });
}
```

## 🚀 Deployment

### 1. Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### 2. Environment Variables for Production

```env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-client-secret
DATABASE_URL=your-production-database-url
```

### 3. Google OAuth Production Setup

1. Update authorized redirect URIs in Google Cloud Console
2. Add your production domain to authorized origins
3. Update OAuth consent screen with production information

## 🧪 Testing

### 1. Manual Testing

```bash
# Start development server
npm run dev

# Test authentication flow
# 1. Visit http://localhost:3006
# 2. Click "Sign In with Google"
# 3. Complete Google OAuth flow
# 4. Verify redirect to dashboard
# 5. Test protected API endpoint
```

### 2. API Testing

```bash
# Test protected endpoint (requires authentication)
curl -X GET http://localhost:3006/api/protected \
  -H "Cookie: next-auth.session-token=your-session-token"
```

## 🔧 Configuration Options

### 1. NextAuth Configuration

```typescript
// src/lib/auth.ts
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent", // Force consent screen
          access_type: "offline", // Request refresh token
          response_type: "code", // Authorization code flow
        },
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT strategy
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
};
```

### 2. Custom Callbacks

```typescript
callbacks: {
  async signIn({ user, account, profile }) {
    // Custom sign-in logic
    return true;
  },
  async session({ session, user, token }) {
    // Add custom data to session
    session.user.role = user?.role || "user";
    return session;
  },
  async jwt({ token, user, account }) {
    // Add custom data to JWT
    if (account) {
      token.accessToken = account.access_token;
    }
    return token;
  },
}
```

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid redirect URI"**

   - Check Google Cloud Console redirect URIs
   - Ensure exact match with callback URL

2. **"NEXTAUTH_SECRET not set"**

   - Generate and set NEXTAUTH_SECRET environment variable
   - Use: `openssl rand -base64 32`

3. **"Session not persisting"**

   - Check NEXTAUTH_URL environment variable
   - Ensure cookies are enabled in browser

4. **"TypeScript errors"**
   - Install @types/next-auth
   - Check type definitions in types/next-auth.d.ts

### Debug Mode

Enable debug mode in development:

```typescript
// src/lib/auth.ts
export const authOptions: NextAuthOptions = {
  // ... other options
  debug: process.env.NODE_ENV === "development",
};
```

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Authentication Guide](https://nextjs.org/docs/authentication)
- [Prisma Documentation](https://www.prisma.io/docs/)

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

- Check the [NextAuth.js documentation](https://next-auth.js.org/)
- Review the [Google OAuth setup guide](https://developers.google.com/identity/protocols/oauth2)
- Open an issue in this repository

---

**Happy coding! 🚀**
