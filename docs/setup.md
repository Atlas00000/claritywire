# Setup Guide

## Prerequisites
- Node.js 18.17 or later
- pnpm 8.0 or later
- Git
- Supabase account

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/claritywire.git
cd claritywire
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Keys (if needed)
NEXT_PUBLIC_API_KEY=your_api_key
```

4. Initialize the database:
```bash
pnpm db:setup
```

## Development

1. Start the development server:
```bash
pnpm dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Theme Configuration
The application uses a theme provider for dark/light mode support. Configure it in `components/theme-provider.tsx`:

```typescript
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
  storageKey="claritywire-theme"
>
```

### API Configuration
API endpoints are configured in `lib/api.ts`. Update the base URL and endpoints as needed:

```typescript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
```

### Database Configuration
Database configuration is handled through Supabase. Update the connection details in your environment variables.

## Troubleshooting

### Common Issues

1. **Module not found errors**
   - Clear the `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `pnpm install`

2. **Environment variables not loading**
   - Ensure `.env.local` exists in the root directory
   - Restart the development server

3. **Database connection issues**
   - Verify Supabase credentials
   - Check network connectivity
   - Ensure database migrations are up to date

## Next Steps
- Review the [Component Documentation](./components.md)
- Check the [API Documentation](./api.md)
- Read the [Database Schema](./database.md) 