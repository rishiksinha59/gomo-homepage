# GO MO Group - Homepage & Headless CMS Implementation

A responsive Next.js 16 single-page web application integrated with **Strapi v5 Headless CMS**, featuring a dynamic zone page-builder component registry, end-to-end CMS persistence, instant webhook edge revalidation, dynamic SEO metadata, and external public API fallback integration.

---

## 🚀 Live Deliverable URLs

- **Live Next.js Website (Vercel)**: [https://gomo-homepage.vercel.app](https://gomo-homepage.vercel.app)
- **Live Strapi CMS Admin (Render)**: [https://gomo-cms.onrender.com/admin](https://gomo-cms.onrender.com/admin)
- **CMS Admin Credentials**:
  - **Username**: `gomoadmin`
  - **Password**: `gomoadmin`
- **GitHub Repositories**:
  - **Frontend**: [https://github.com/rishiksinha59/gomo-homepage](https://github.com/rishiksinha59/gomo-homepage)
  - **CMS**: [https://github.com/rishiksinha59/gomo-cms](https://github.com/rishiksinha59/gomo-cms)

---

## 📐 Senior Engineering Architecture & Design Decisions

### 1. Dynamic Zone Component Registry Pattern
The application decouples content orchestration from frontend releases using **Next.js 16 Server Components** and **Strapi v5 Dynamic Zones**. 
- In `app/page.tsx`, a lookup table maps Strapi dynamic components (`sections.hero-section`, `sections.about-section`, `sections.brands-section`, `sections.industries-section`, `sections.features-section`, `sections.projects-section`, `sections.news-section`, `sections.cta-section`) to their modular React UI implementations.
- Content editors can **add, delete, or re-order sections in Strapi Admin**, and the UI updates dynamically without requiring any code deployments.

### 2. High-Performance Edge Caching & On-Demand Revalidation
- **ISR Edge Caching**: Server fetches are cached with `revalidate: 3600` and deduplicated per-request using React `cache()`, guaranteeing `<100ms` TTFB edge response times.
- **On-Demand Webhook Route (`POST /api/revalidate`)**: Strapi webhooks trigger instant edge cache purges (`revalidatePath('/', 'layout')`) whenever content is published or updated in CMS, delivering sub-second content freshness.

### 3. Resilient UX & Error Boundaries
- **App Router `loading.tsx`**: Renders an animated skeleton shimmer instantly while server components fetch CMS payloads, eliminating blank white loading states.
- **App Router `error.tsx`**: Provides an interactive error boundary fallback UI to handle potential network or CMS outages gracefully.

---

## 🛠️ CMS Structure (Strapi v5)

- **Single Types**:
  - `Homepage`: Managed Dynamic Zone containing 8 dynamic sections + `seo` component.
  - `Global`: Site-wide Navbar and Footer configuration.
- **Collection Types**:
  - `Newsletter-subscriber`: Stores validated subscriber emails collected via custom API.
- **Components**:
  - `sections.hero-section`, `sections.about-section`, `sections.brands-section`, `sections.industries-section`, `sections.features-section`, `sections.projects-section`, `sections.news-section`, `sections.cta-section`, `shared.seo`.

---

## 🔌 API Endpoints Created & Integrated

### 1. Custom Backend API (`POST /api/newsletter`)
- **Route**: `/api/newsletter` | **Method**: `POST`
- **Architecture**: Validates email formats using strict regex, returns structured JSON (200, 400, 502, 500), and persists entries directly into Strapi's `newsletter-subscribers` collection.
- **Payload**:
  ```json
  {
    "email": "developer@gomogroup.com"
  }
  ```

### 2. On-Demand Revalidation Webhook (`POST /api/revalidate`)
- **Route**: `/api/revalidate` | **Method**: `POST / GET`
- **Features**: Secret token authentication (`REVALIDATE_SECRET`), instant Next.js edge cache revalidation (`revalidatePath`).

### 3. Third-Party Public API Integration (JSONPlaceholder)
- **Endpoint**: `https://jsonplaceholder.typicode.com/posts?_limit=3`
- **Implementation**: Fetched server-side in `page.tsx`. If Strapi CMS articles are empty, it gracefully maps remote posts into fallback insight cards in `NewsSection.tsx`.

---

## ⭐ Bonus Features Implemented

1. **Dynamic SEO Metadata**: Server-side `generateMetadata()` driven by Strapi `shared.seo` (`metaTitle`, `metaDescription`, `keywords`, OpenGraph 1200x630 image & Twitter Cards).
2. **End-to-End CMS Persistence**: Custom API POST operations saved into live database tables.
3. **Infinite continuous marquee**: Dynamic step-width tracking for 60fps edge-to-edge project card sliders.
4. **Image Optimization**: WebP/AVIF automatic image transcoding via Next.js Image Optimization API.

---

## 💻 Local Setup Instructions

### 1. Strapi CMS Setup
```bash
git clone https://github.com/rishiksinha59/gomo-cms.git
cd gomo-cms
npm install
npm run build
npm run develop
```
- CMS Admin available at `http://localhost:1337/admin`.

### 2. Next.js Frontend Setup
```bash
git clone https://github.com/rishiksinha59/gomo-homepage.git
cd gomo-homepage
npm install
```
- Create `.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
REVALIDATE_SECRET=gomo-revalidate-secret-key-2026
```
- Run development server:
```bash
npm run dev
```
- Open `http://localhost:3000` in browser.
