# RN Website

A modern React business website for RN - Business Intelligence, Dashboards & Microsoft 365 automation services.

## Tech Stack

- React 18 + TypeScript + Vite
- Material UI v5 (MUI)
- React Hook Form + Zod validation
- Plus Jakarta Sans font
- Supabase for data storage
- Vercel for deployment

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and add your Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
NOTIFY_EMAIL=your_notification_email@example.com
```

**Important:** Never commit `.env.local` to git. The service role key should only be used server-side (in the API route).

- `RESEND_API_KEY`: Your Resend API key for sending email notifications when new enquiries are submitted
- `NOTIFY_EMAIL`: The email address to receive enquiry notifications

### Database Setup

Create a Supabase table named `enquiries` with the following schema:

```sql
CREATE TABLE public.enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  business TEXT NOT NULL,
  services TEXT[] DEFAULT ARRAY[]::TEXT[],
  message TEXT,
  status TEXT DEFAULT 'new'
);
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Type Check

```bash
tsc -b
```

### Lint

```bash
npm run lint
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy

The API route at `/api/enquiry.ts` will automatically be deployed as a Vercel serverless function.

## Project Structure

```
src/
├── content/
│   └── siteContent.ts        # All website copy
├── theme/
│   ├── theme.ts              # MUI dark/light themes
│   └── ColorModeContext.tsx  # Theme switching logic
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── WhoWeHelp.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── Process.tsx
│   ├── WhyUs.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── hooks/
│   └── useReveal.ts          # Scroll reveal animation
├── App.tsx
└── main.tsx

api/
├── _lib/
│   └── schema.ts             # Shared Zod validation schema
└── enquiry.ts                # Vercel serverless function
```

## Features

- 🌓 Dark/light mode with system preference detection
- 📱 Fully responsive design (mobile-first)
- ✨ Smooth scroll reveal animations
- 🎨 Modern gradient UI with glassmorphism effects
- ✅ Form validation with React Hook Form + Zod
- 🔒 Honeypot spam protection
- 📊 Contact form with Supabase integration
- ♿ WCAG AA accessibility compliance
- 🚀 Optimized for performance
