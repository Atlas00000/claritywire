# Backend & Database Roadmap

## Overview
This roadmap outlines the essential backend and database features for the ClarityWire prototype, using Supabase for the database and Render for deployment. We're focusing on core functionality and simplicity over complexity.

## Tech Stack
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Render
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **API**: Next.js API Routes + Supabase Client

## Phase 1: Database Setup (Supabase)

### Core Tables
1. **users**
   ```sql
   - id (uuid, primary key)
   - email (string, unique)
   - full_name (string)
   - created_at (timestamp)
   - updated_at (timestamp)
   - avatar_url (string, nullable)
   ```

2. **articles**
   ```sql
   - id (uuid, primary key)
   - title (string)
   - content (text)
   - slug (string, unique)
   - author_id (uuid, foreign key -> users.id)
   - category_id (uuid, foreign key -> categories.id)
   - published_at (timestamp)
   - created_at (timestamp)
   - updated_at (timestamp)
   - featured_image (string, nullable)
   ```

3. **categories**
   ```sql
   - id (uuid, primary key)
   - name (string)
   - slug (string, unique)
   - description (text, nullable)
   ```

4. **topics**
   ```sql
   - id (uuid, primary key)
   - name (string)
   - slug (string, unique)
   - category_id (uuid, foreign key -> categories.id)
   ```

### Basic Relationships
- Articles belong to Categories
- Articles belong to Users (authors)
- Topics belong to Categories

## Phase 2: Authentication (Supabase Auth)

### Features
1. **Email/Password Authentication**
   - Sign up
   - Sign in
   - Password reset
   - Email verification

2. **Social Authentication**
   - Google OAuth
   - Apple OAuth (if needed)

3. **Session Management**
   - JWT handling
   - Session persistence
   - Secure cookie management

## Phase 3: API Implementation

### Core Endpoints
1. **Authentication**
   ```typescript
   POST /api/auth/signup
   POST /api/auth/signin
   POST /api/auth/signout
   POST /api/auth/reset-password
   ```

2. **Articles**
   ```typescript
   GET /api/articles
   GET /api/articles/[slug]
   POST /api/articles (protected)
   PUT /api/articles/[id] (protected)
   DELETE /api/articles/[id] (protected)
   ```

3. **Categories**
   ```typescript
   GET /api/categories
   GET /api/categories/[slug]
   ```

4. **Topics**
   ```typescript
   GET /api/topics
   GET /api/topics/[slug]
   ```

## Phase 4: File Storage (Supabase Storage)

### Features
1. **Image Upload**
   - Article featured images
   - User avatars
   - Category icons

2. **Storage Structure**
   ```
   /public
     /articles
     /avatars
     /categories
   ```

## Phase 5: Deployment (Render)

### Setup Steps
1. **Database**
   - Create Supabase project
   - Set up database tables
   - Configure security rules

2. **Backend**
   - Deploy Next.js app to Render
   - Configure environment variables
   - Set up build commands

3. **Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   ```

## Implementation Priorities

### High Priority
1. Basic user authentication
2. Article CRUD operations
3. Category and topic management
4. Basic image upload

### Medium Priority
1. Social authentication
2. Advanced search
3. User profiles
4. Article analytics

### Low Priority (Future)
1. Comments system
2. User preferences
3. Newsletter integration
4. Advanced analytics

## Security Considerations

### Essential Security Measures
1. Row Level Security (RLS) in Supabase
2. API route protection
3. Input validation
4. Rate limiting
5. CORS configuration

## Monitoring & Maintenance

### Basic Monitoring
1. Error logging
2. Performance monitoring
3. Database backups
4. Uptime monitoring

## Next Steps
1. Set up Supabase project
2. Create database schema
3. Implement authentication
4. Create basic API endpoints
5. Deploy to Render

## Notes
- Keep the implementation simple and focused on core features
- Use Supabase's built-in features where possible
- Implement proper error handling
- Document all API endpoints
- Test thoroughly before deployment 