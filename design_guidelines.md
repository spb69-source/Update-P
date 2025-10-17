# TikTok Login Page Design Guidelines

## Design Approach
**Reference-Based**: Direct inspiration from TikTok's official login interface, maintaining their distinctive brand identity and user experience patterns.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary)**
- Background: 0 0% 8% (near-black)
- Surface: 0 0% 12% (elevated elements)
- Primary (TikTok Pink): 348 99% 58% 
- Secondary (TikTok Cyan): 180 94% 56%
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 70%
- Border: 0 0% 18%
- Error: 0 84% 60%

**Light Mode (Secondary)**
- Background: 0 0% 100%
- Surface: 0 0% 98%
- Text Primary: 0 0% 10%
- Border: 0 0% 88%

### B. Typography

**Font Family**: 
- Primary: 'Proxima Nova', system-ui, -apple-system, sans-serif
- Fallback: Inter, 'Segoe UI', sans-serif

**Hierarchy**:
- Page Title: 32px/40px, Bold (TikTok wordmark positioning)
- Section Headers: 24px/32px, Semibold
- Login Options: 16px/24px, Medium
- Body Text: 15px/20px, Regular
- Helper Text: 13px/18px, Regular
- Legal Links: 12px/16px, Regular

### C. Layout System

**Tailwind Spacing Units**: Consistently use 4, 6, 8, 12, 16, 24 for padding/margins

**Container Structure**:
- Max-width: 380px (mobile-optimized)
- Centered layout with minimal side padding
- Vertical spacing: 24px between major sections
- Form field spacing: 16px between inputs

### D. Component Library

**TikTok Logo & Branding**:
- TikTok musical note icon (use SVG or icon font)
- "TikTok" wordmark in brand font
- Position: Top center with 40px top padding

**Login Methods Container**:
- Rounded corners: 8px
- Multiple stacked buttons with 12px spacing
- Each button: Full-width, 48px height, rounded-md
- Icon positioning: Left-aligned with 16px padding

**Primary Login Options** (Buttons):
- "Use phone or email" - White background, black text
- "Continue with Google" - White with Google icon
- "Continue with Facebook" - Facebook blue (#1877F2)
- "Continue with Apple" - Black with Apple icon
- "Continue with Twitter" - Twitter blue with icon

**QR Code Section**:
- Background: Subtle surface color
- Padding: 24px
- QR code: 200x200px placeholder
- Helper text below in muted color

**Form Inputs** (Phone/Email flow):
- Height: 48px
- Border: 1px solid border color
- Rounded: 4px
- Focus state: Border changes to primary pink
- Country code selector: Dropdown with flags (for phone)
- Password field: Toggle visibility icon (eye icon)

**Password Visibility Toggle**:
- Position: Absolute right, vertically centered
- Icon: Eye/eye-off (16px)
- Clickable area: 40x40px

**Footer Links**:
- "Don't have an account? Sign up" - Pink color on Sign up
- Terms of Service, Privacy Policy - Muted, underlined on hover
- Small text: 12px, centered, 16px bottom padding

### E. Interactive States

**Buttons**:
- Default: Solid background with subtle shadow
- Hover: Slight opacity change (0.9)
- Active: Scale down (0.98)
- Disabled: 0.5 opacity with cursor-not-allowed

**Form Fields**:
- Default: Border in muted color
- Focus: Pink border (2px), subtle glow
- Error: Red border with error message below
- Success: Green checkmark icon right-aligned

**Transitions**: 
- Use sparingly: 150ms ease-in-out for color/opacity changes
- Avoid elaborate animations

## Key UX Patterns

**Progressive Disclosure**:
1. Initially show login method selection
2. Clicking "Use phone or email" reveals form
3. Toggle between phone/email with tab selector
4. QR code option in separate collapsible section

**Validation**:
- Real-time for email format
- Phone number format with country code
- Password minimum 8 characters
- Error messages appear below fields in red

**Mobile-First Considerations**:
- Touch targets minimum 44px height
- Keyboard-friendly inputs with proper types
- Auto-focus on primary input field
- No horizontal scroll, stack all elements

**Trust Elements**:
- Terms & Privacy links prominently placed
- Security badge/icon near password field
- "Secure login" text in muted color

## Accessibility

- Maintain WCAG AA contrast ratios
- Keyboard navigation support for all interactive elements
- Focus indicators visible on all focusable elements
- Screen reader labels for icon-only buttons
- Dark mode as default (matches TikTok's primary theme)

## Images

**No Hero Image Required** - This is a utility-focused login page. Visual elements limited to:
- TikTok logo/wordmark at top
- Social login provider icons (Google, Facebook, Apple, Twitter)
- QR code placeholder (generated or static image)
- Optional: Decorative gradient background (pink to cyan, subtle, low opacity)