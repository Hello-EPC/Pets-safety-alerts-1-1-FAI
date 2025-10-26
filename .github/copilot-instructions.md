# Pet Emergency Safety Platform - AI Agent Guide

## Project Overview
This is a React/TypeScript emergency pet care platform built with Vite, shadcn/ui, Supabase, and Tailwind CSS. The system handles emergency pet alerts, connects pet owners with certified sitters, and provides real-time dispatch coordination.

## Architecture & Key Patterns

### Role-Based Access Control (Critical)
The app has three distinct user roles with separate dashboards:
- **Member**: Pet owners who can trigger emergency alerts (`MemberDashboard`)
- **Sitter**: Certified pet care providers who respond to emergencies (`SitterDashboard`) 
- **Admin**: Dispatch operators who coordinate emergency responses (`AdminPanel`, `/emergency-dispatch`)

All role checks happen in `AuthContext.tsx` using Supabase profiles. Use `ProtectedRoute` component for route protection and manual role checks in `AppLayout.tsx` for view-based navigation.

### Emergency Alert System
Emergency workflows follow this pattern:
1. **Trigger**: Members create alerts via `EmergencyTrigger` component with pet selection, location, and severity
2. **Timeline**: All alert events logged in `emergency_timeline` table via Supabase
3. **Dispatch**: Admins monitor alerts in `DispatchDashboard` with real-time updates
4. **Response**: Sitters receive notifications through `SitterAlertPanel`

Key tables: `emergency_alerts`, `emergency_timeline`, `pets`, `profiles`

### Context Architecture
- `AuthContext`: Handles Supabase authentication, user profiles, and role management
- `AppContext`: Simple app state (sidebar toggles, etc.)
- Both providers wrap the entire app in `App.tsx`

### UI Component System
Built on shadcn/ui with custom components in `/components/ui/`. Follow these patterns:
- Import UI components: `import { Button } from '@/components/ui/button'`
- Custom components: `import CustomComponent from '@/components/CustomComponent'`
- Use `cn()` utility from `@/lib/utils` for conditional styling
- Consistent color scheme: Yellow primary (`yellow-400`), black/gray neutrals

## Development Workflows

### Database Operations
All Supabase operations use this pattern:
```tsx
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('column', value);
```

Always handle authentication state via `useAuth()` hook - never access Supabase user directly.

### Component Development
- **Location**: All components in `src/components/` (dashboards, forms, UI elements)
- **Pages**: Route components in `src/pages/` (Index, Login, EmergencyDispatch, NotFound)
- **Hooks**: Custom hooks in `src/hooks/` (mobile detection, toast management)

### Navigation Patterns
The app uses a hybrid approach:
- **Public routes**: React Router in `App.tsx` for `/`, `/login`, `/emergency-dispatch` 
- **Authenticated views**: State-based navigation in `AppLayout.tsx` via `currentView`

When adding authenticated features, use the `handleViewChange` pattern in `AppLayout.tsx` with role validation.

## Critical Dependencies
- **Supabase**: `@supabase/supabase-js` - Database, auth, real-time subscriptions
- **shadcn/ui**: Pre-built components with Radix UI primitives
- **React Query**: `@tanstack/react-query` - Server state management
- **Lucide React**: Icon system (`import { IconName } from 'lucide-react'`)

## Build & Development
```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # ESLint check
```

## Emergency Domain Context
This platform handles real pet emergencies including lost pets, injuries, sudden illness, and behavioral issues. All emergency features should prioritize speed, clear communication, and reliable location tracking. The dispatch system coordinates between multiple sitters and maintains detailed timelines for incident tracking.

Key business logic: Emergency severity levels (critical, high, medium), sitter availability status, backup sitter requests, and real-time location tracking for emergency response.