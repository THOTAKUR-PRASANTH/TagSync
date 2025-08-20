# Layout Components

This directory contains the main layout component for the TagSync application.

## Component

### SecuredLayout
A comprehensive layout with sidebar navigation and top navbar, perfect for all secured pages.

**Features:**
- Responsive sidebar with navigation
- Top navbar with notifications and user menu
- Mobile-friendly with overlay sidebar
- Consistent styling across all secured pages
- Modular component structure (Sidebar + TopNavbar)

**Usage:**
```tsx
import { SecuredLayout } from '@/app/components/layout';

export default function DashboardPage() {
  return (
    <SecuredLayout user={user}>
      {/* Your page content here */}
    </SecuredLayout>
  );
}
```

## Layout Structure

### SecuredLayout (Full Dashboard)
```
┌─────────────────────────────────────┐
│ Top Navbar (Notifications, Logout) │
├─────────────┬───────────────────────┤
│             │                       │
│   Sidebar   │    Main Content      │
│             │                       │
│             │                       │
│             │                       │
└─────────────┴───────────────────────┘
```

## Component Architecture

### SecuredLayout Structure
- **Main Container**: Handles overall layout and state
- **Sidebar Component**: Internal component for navigation
- **TopNavbar Component**: Internal component for top bar
- **Children**: Rendered in main content area

### Benefits of Modular Design
- **Reusable**: Can be used for any secured page
- **Maintainable**: Each component has a single responsibility
- **Testable**: Individual components can be tested separately
- **Flexible**: Easy to modify individual parts without affecting others

## Styling

All components use:
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Consistent color scheme with the TagSync brand
- Glassmorphism effects with backdrop blur
- Responsive design for all screen sizes

## Integration

This layout is already integrated into:
- `/dashboard/*` - Uses SecuredLayout
- `/secure/*` - Uses SecuredLayout
- Can be easily added to other secured routes

## Customization

The component accepts props for customization:
- Navigation items (in sidebar)
- User information
- Children content
