# Custom Authentication UI Documentation

## Overview

This project uses **Clerk** for authentication but implements a **fully custom UI** instead of Clerk's pre-built components. This gives you complete control over the design while leveraging Clerk's robust authentication infrastructure.

---

## 🎨 Custom Auth Pages

### Sign In (`/auth/sign-in`)
- **Email/Password authentication**
- **Google OAuth** (modal popup)
- **Remember me** checkbox
- **Forgot password** link
- Error handling with user-friendly messages
- Loading states

### Sign Up (`/auth/sign-up`)
- **Multi-step flow**:
  1. Enter details (first name, last name, email, password)
  2. Email verification with 6-digit code
- **Google OAuth** option
- Password strength requirements
- Terms of Service & Privacy Policy links
- Automatic redirect after successful signup

### Forgot Password (`/auth/forgot-password`)
- **Three-step process**:
  1. Enter email address
  2. Enter verification code + new password
  3. Success confirmation
- Password reset via email code
- Secure password update

### SSO Callback (`/auth/sso-callback`)
- Handles OAuth redirects from Google and other providers
- Loading state during authentication
- Automatic redirect to home page

---

## 👤 Account Management Pages

### Profile (`/account/profile`)
- **Edit personal information**:
  - First name
  - Last name
  - Email (read-only)
- **Account information display**:
  - Account ID
  - Member since date
  - Email verification status
- Success/error notifications
- Real-time updates

### Security (`/account/security`)
- **Change password**:
  - Current password verification
  - New password with confirmation
  - Password strength validation
- **Two-Factor Authentication** (placeholder for future implementation)
- **Active sessions** display
- Detects if user signed in with OAuth (password not available)

### Devices (`/account/devices`)
- **Current session display**:
  - Device type
  - Last active time
  - Email address
- **Security notices**:
  - Session management tips
  - Link to advanced features via Clerk User Profile
  - Security best practices

---

## 🧩 Reusable Components

### `AuthLayout`
**Location**: `components/AuthLayout.tsx`

Wrapper component for all auth pages providing:
- Centered glassmorphism card
- Logo with link to home
- Back button
- Consistent spacing and styling
- Footer with copyright

**Props**:
```typescript
{
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
}
```

### `AuthInput`
**Location**: `components/AuthInput.tsx`

Custom input component with:
- Label with optional required indicator
- Password visibility toggle
- Error state styling
- Disabled state
- Placeholder support
- Auto-complete attributes

**Props**:
```typescript
{
  type?: 'text' | 'email' | 'password';
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
}
```

### `AuthButton`
**Location**: `components/AuthButton.tsx`

Button component with:
- Three variants: primary, secondary, ghost
- Loading state with spinner
- Disabled state
- Full width or auto width
- Smooth animations

**Props**:
```typescript
{
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}
```

---

## 🔧 Clerk Integration

### Headless API Usage

This implementation uses Clerk's **headless hooks** for complete UI control:

#### Sign In
```typescript
import { useSignIn } from '@clerk/nextjs';

const { signIn, setActive } = useSignIn();

// Email/Password
const result = await signIn.create({
  identifier: email,
  password,
});

if (result.status === 'complete') {
  await setActive({ session: result.createdSessionId });
}

// OAuth
await signIn.authenticateWithRedirect({
  strategy: 'oauth_google',
  redirectUrl: '/auth/sso-callback',
  redirectUrlComplete: '/',
});
```

#### Sign Up
```typescript
import { useSignUp } from '@clerk/nextjs';

const { signUp, setActive } = useSignUp();

// Create account
await signUp.create({
  firstName,
  lastName,
  emailAddress: email,
  password,
});

// Send verification email
await signUp.prepareEmailAddressVerification({ 
  strategy: 'email_code' 
});

// Verify email
const result = await signUp.attemptEmailAddressVerification({ code });

if (result.status === 'complete') {
  await setActive({ session: result.createdSessionId });
}
```

#### User Management
```typescript
import { useUser } from '@clerk/nextjs';

const { user } = useUser();

// Update profile
await user.update({
  firstName,
  lastName,
});

// Change password
await user.updatePassword({
  currentPassword,
  newPassword,
});
```

#### Sign Out
```typescript
import { useClerk } from '@clerk/nextjs';

const { signOut } = useClerk();

await signOut();
```

---

## 🎨 Design System

### Color Palette
- **Background**: `#060010` (deep purple-black)
- **Foreground**: White with opacity variants
- **Borders**: `white/10`, `white/20`
- **Cards**: `white/[0.02]` with backdrop blur
- **Success**: Green (`green-400`, `green-500`)
- **Error**: Red (`red-400`, `red-500`)
- **Info**: Blue (`blue-400`, `blue-500`)

### Typography
- **Headings**: TASA Orbiter font
- **Body**: Inter font (light weight, 300)
- **Monospace**: JetBrains Mono

### Effects
- **Glassmorphism**: `backdrop-blur-xl` + `bg-white/[0.02]`
- **Smooth transitions**: `transition-all duration-200`
- **Hover states**: Scale, color, and background changes
- **Focus rings**: `focus:ring-2 focus:ring-white/20`

---

## 📁 File Structure

```
app/
├── auth/
│   ├── sign-in/
│   │   └── page.tsx          # Sign in page
│   ├── sign-up/
│   │   └── page.tsx          # Sign up page
│   ├── forgot-password/
│   │   └── page.tsx          # Password reset
│   └── sso-callback/
│       └── page.tsx          # OAuth callback
├── account/
│   ├── layout.tsx            # Account pages layout
│   ├── profile/
│   │   └── page.tsx          # Profile settings
│   ├── security/
│   │   └── page.tsx          # Security settings
│   └── devices/
│       └── page.tsx          # Device management
└── page.tsx                  # Landing page

components/
├── AuthLayout.tsx            # Auth pages wrapper
├── AuthInput.tsx             # Custom input component
└── AuthButton.tsx            # Custom button component

middleware.ts                 # Clerk middleware
```

---

## 🚀 Navigation Flow

### Unauthenticated Users
```
Landing Page → Sign In/Sign Up → Email Verification → Landing Page (authenticated)
                     ↓
              Forgot Password → Reset → Sign In
```

### Authenticated Users
```
Landing Page → Account (Profile/Security/Devices) → Sign Out
```

---

## 🔒 Security Features

1. **Password Requirements**:
   - Minimum 8 characters
   - Enforced by Clerk

2. **Email Verification**:
   - Required for all new accounts
   - 6-digit code sent via email

3. **Session Management**:
   - Automatic session expiration
   - Current session tracking
   - Sign out functionality

4. **OAuth Security**:
   - Secure redirect flow
   - State parameter validation (handled by Clerk)

5. **Error Handling**:
   - User-friendly error messages
   - No sensitive information leaked
   - Proper validation feedback

---

## 🎯 Customization Guide

### Adding New OAuth Providers

1. **Enable in Clerk Dashboard**:
   - Go to Clerk Dashboard → Social Connections
   - Enable desired provider (GitHub, Twitter, etc.)

2. **Update Sign In/Sign Up Pages**:
```typescript
const handleProviderSignIn = async (provider: 'oauth_github' | 'oauth_twitter') => {
  await signIn.authenticateWithRedirect({
    strategy: provider,
    redirectUrl: '/auth/sso-callback',
    redirectUrlComplete: '/',
  });
};
```

3. **Add Provider Button**:
```tsx
<AuthButton 
  variant="secondary"
  onClick={() => handleProviderSignIn('oauth_github')}
>
  <GitHubIcon />
  Continue with GitHub
</AuthButton>
```

### Styling Customization

All components use Tailwind CSS classes. To customize:

1. **Colors**: Update `app/globals.css` theme tokens
2. **Fonts**: Modify `app/layout.tsx` font imports
3. **Spacing**: Adjust padding/margin classes in components
4. **Effects**: Modify backdrop-blur, opacity values

### Adding New Account Pages

1. Create new page in `app/account/[page-name]/page.tsx`
2. Add navigation item in `app/account/layout.tsx`:
```typescript
const navigation = [
  // ... existing items
  { name: 'New Page', href: '/account/new-page', icon: IconComponent },
];
```

---

## 📊 Error Handling

### Sign In Errors
- Invalid credentials
- Account not found
- Email not verified
- Network errors

### Sign Up Errors
- Email already exists
- Weak password
- Invalid email format
- Verification code expired

### Profile Update Errors
- Invalid data format
- Network errors
- Permission denied

All errors are caught and displayed with user-friendly messages in colored alert boxes.

---

## ✅ Testing Checklist

- [ ] Sign up with email/password
- [ ] Verify email with code
- [ ] Sign in with email/password
- [ ] Sign in with Google OAuth
- [ ] Forgot password flow
- [ ] Update profile information
- [ ] Change password
- [ ] View devices/sessions
- [ ] Sign out
- [ ] Error states for all forms
- [ ] Loading states for all actions
- [ ] Mobile responsiveness
- [ ] Keyboard navigation
- [ ] Screen reader compatibility

---

## 🔗 Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk React Hooks](https://clerk.com/docs/references/react/use-sign-in)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Your custom authentication system is now complete!** 🎉

All pages follow your premium dark theme design and provide a seamless user experience.
