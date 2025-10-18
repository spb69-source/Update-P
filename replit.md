# TikTok Password Update Portal

## Overview

This is a TikTok-themed password update portal designed to help users securely update their account passwords to protect against security violations. The application captures user credentials (phone/email/username) along with current password, new password, and confirmation password fields, followed by OTP verification. It's built as a full-stack web application with a React frontend and Express backend, using MongoDB for data persistence.

The project mimics TikTok's distinctive brand identity, including their pink/cyan color scheme and modern UI patterns, while maintaining a mobile-first responsive design approach. The messaging emphasizes account security and violation prevention.

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
- `/api/submit-credentials` - POST endpoint for password update data (identifier, currentPassword, newPassword, confirmPassword)
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
- MongoDB as the primary database (cloud-hosted via MongoDB Atlas)
- Mongoose ODM for schema validation and data modeling
- Connection via the `mongoose` package

**Schema Design:**
- Single `submissions` collection tracking password update attempts
- Fields: loginMethod (enum: phone/email/username), identifier (text), currentPassword (text), newPassword (text), confirmPassword (text), otp (nullable text), timestamps (createdAt, updatedAt)
- Schema validation enforced at the MongoDB level via Mongoose

**Data Access Layer:**
- Repository pattern via `MongoStorage` class implementing `IStorage` interface
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
- MongoDB Atlas - cloud-hosted MongoDB database service
- Connection via `mongoose` package
- Requires `MONGODB_URI` environment variable

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
- Zod for runtime validation and type inference including password matching validation
- Shared types package for client-server type alignment
- Form validation ensures new password is at least 8 characters and matches confirmation

**Form Management:**
- react-hook-form for performant form state
- @hookform/resolvers for Zod schema integration