# ClarityWire Documentation

## Overview
ClarityWire is a modern news platform built with Next.js, TypeScript, and Supabase. This documentation provides comprehensive guides for setting up, developing, and maintaining the application.

## Table of Contents
1. [Setup Guide](./setup.md)
2. [Component Documentation](./components.md)
3. [API Documentation](./api.md)
4. [Database Schema](./database.md)
5. [Deployment Guide](./deployment.md)

## Quick Start
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Tech Stack
- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Render
- **State Management**: React Hooks
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Animations**: Framer Motion

## Project Structure
```
claritywire/
├── app/                 # Next.js app directory
├── components/         # Reusable components
├── lib/               # Utility functions and types
├── hooks/             # Custom React hooks
├── public/            # Static assets
├── styles/            # Global styles
└── docs/              # Documentation
```

## Contributing
Please read our [Contributing Guide](./contributing.md) before submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 