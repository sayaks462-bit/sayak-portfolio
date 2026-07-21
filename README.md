# Interior Designer Portfolio

A world-class, Awwwards-quality interior designer portfolio built with Next.js 15, Sanity CMS, Framer Motion, and Tailwind CSS.

## Quick Start

### 1. Install Dependencies

```bash
# Make sure Node.js 18+ is installed
npm install
```

### 2. Set Up Sanity CMS

1. Create a free account at [sanity.io](https://www.sanity.io/)
2. Create a new project
3. Copy your Project ID

### 3. Configure Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-28
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the portfolio.
Open [http://localhost:3000/studio](http://localhost:3000/studio) for Sanity Studio.

### 5. Add Your First Project

1. Go to `/studio` in your browser
2. Click "Project" in the sidebar
3. Click "Create new"
4. Fill in:
   - **Title**: e.g., "Modern Living Room"
   - **Slug**: click "Generate" 
   - **Category**: select from dropdown (Living Room, Kitchen, etc.)
   - **Cover Image**: upload a hero image
   - **Gallery Images**: upload multiple images (these auto-create your gallery)
   - **Software Used**: add tags like "3ds Max", "V-Ray"
   - **Location**: e.g., "New York, NY"
   - **Year**: e.g., "2024"
   - **Featured**: toggle on/off
   - **Display Order**: number (lower = shown first)
5. Click "Publish"

The website updates automatically — no code changes needed.

## Sanity Studio Guide

### Creating Projects

In Sanity Studio (`/studio`):

| Field | Description |
|-------|------------|
| Title | Project name (required) |
| Slug | URL-friendly name (auto-generated from title) |
| Description | Project overview text |
| Category | Dropdown: Residential, Bathroom, Bedroom, Kitchen, Living Room, TV Unit, Commercial |
| Software Used | Tags: 3ds Max, V-Ray, SketchUp, etc. |
| Location | City, State |
| Year | Project year |
| Cover Image | Main hero image (required) |
| Gallery Images | Unlimited images — uploaded here become the gallery automatically |
| Tags | Searchable tags |
| Thumbnail | Optional separate thumbnail |
| Featured | Toggle to show on homepage |
| Display Order | Lower numbers shown first |

### Managing Content

- **Create**: Click "+" in the sidebar, select content type
- **Edit**: Click any document, make changes, click "Publish"
- **Delete**: Open document, click the menu (⋯), select "Delete"
- **Reorder**: Change the "Display Order" number on each project
- **Preview**: Changes appear live after publishing

### Other Content Types

- **Site Settings**: Bio, portrait photo, stats (years, projects, awards, clients), contact info, social links
- **Testimonials**: Client name, role, testimonial content, optional avatar

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── about/page.tsx      # About page
│   │   ├── projects/
│   │   │   ├── page.tsx        # All projects
│   │   │   └── [slug]/page.tsx # Dynamic project page
│   │   ├── services/page.tsx   # Services page
│   │   ├── contact/page.tsx    # Contact page
│   │   └── studio/[[...toolkit]]/page.tsx  # Sanity Studio
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── sections/           # Home page sections
│   │   ├── projects/           # Project-related components
│   │   └── navigation/         # Navbar & Footer
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Sanity client, queries, utils
│   ├── sanity/                 # Sanity schema definitions
│   └── types/                  # TypeScript types
├── sanity.config.ts            # Sanity configuration
└── sanity.cli.ts               # Sanity CLI configuration
```

## Deployment on Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/interior-portfolio.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-10-28
   ```
5. Click "Deploy"

### Step 3: Configure Sanity for Production

1. Go to your Sanity project settings at [sanity.io/manage](https://www.sanity.io/manage)
2. Go to "API" → "CORS Origins"
3. Add your Vercel domain: `https://your-project.vercel.app`

### Step 4: Set Up Webhooks (Auto-Updates)

1. In Sanity Manage, go to "API" → "Webhooks"
2. Create a new webhook:
   - **URL**: `https://your-project.vercel.app/api/revalidate` (if using ISR) or just rely on Next.js server components
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type == "project" || _type == "siteSettings" || _type == "testimonial"`

For the simplest setup, the site uses Sanity's live preview — changes in the studio appear on the next page load.

## Features

### Design
- Dark/Light mode toggle
- Custom cursor with magnetic effects
- Smooth scroll (Lenis)
- Page transitions
- Scroll progress indicator
- Noise texture overlay
- Glassmorphism effects

### Animations
- Text reveal animations
- Parallax image scrolling
- Fade-in on scroll
- Animated counters
- Hover distortion effects
- Loading screen
- Section reveal

### Performance
- Next.js App Router (Server Components)
- Lazy loading images
- Responsive design
- SEO optimized
- Image optimization via Sanity CDN

### CMS
- Sanity Studio at `/studio`
- Real-time content management
- No code editing needed
- Image uploads with hotspot cropping
- Drag-and-drop gallery ordering
- Project categorization and filtering

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 15 | Framework (App Router) |
| React 19 | UI Library |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| GSAP | Advanced Animations |
| Lenis | Smooth Scroll |
| Sanity CMS | Content Management |
| Lucide Icons | Icons |

## License

MIT
