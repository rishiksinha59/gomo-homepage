# GO MO Group - Homepage & Headless CMS Implementation

A full-stack Next.js web application integrated with **Strapi v5 Headless CMS**, featuring dynamic zone page builder architecture, dynamic SEO metadata, external API integration, custom Next.js POST API endpoint, infinite marquee/carousels, and pixel-perfect responsive styling.

---

## 🚀 Live Deliverable URLs

- **Live Next.js Website (Vercel)**: [https://gomo-homepage.vercel.app](https://gomo-homepage.vercel.app)
- **Live Strapi CMS Admin (Render)**: [https://gomo-cms.onrender.com/admin](https://gomo-cms.onrender.com/admin)
- **CMS Admin Credentials**:
  - **Username**: `gomoadmin`
  - **Password**: `gomoadmin`
- **GitHub Repositories**:
  - Frontend: [https://github.com/rishiksinha59/gomo-homepage](https://github.com/rishiksinha59/gomo-homepage)
  - CMS: [https://github.com/rishiksinha59/gomo-cms](https://github.com/rishiksinha59/gomo-cms)

---

## 📐 Architecture Overview (Interview Technical Discussion)

The architecture follows a modern Headless decoupled pattern using **Next.js 15 App Router** as the presentation layer and **Strapi v5** as the content orchestration engine. Content is organized into reusable Single Types (`Homepage` and `Global`) utilizing Strapi **Dynamic Zones**. The Next.js frontend fetches deep-populated REST data at request/build time inside `app/page.tsx` (Server Component). The page dynamically iterates over the component registry (`sections.hero-section`, `sections.about-section`, `sections.brands-section`, etc.), mapping each component to its modular React UI element. This allows content creators to re-order, add, or remove sections in Strapi CMS, reflecting changes instantly on the live site without requiring any code deployments.

To optimize performance and user experience, interactive client state (e.g. infinite marquee carousel logic, newsletter submission state) is strictly isolated within `"use client"` components, while page layout rendering and SEO metadata resolution (`generateMetadata()`) execute asynchronously on the server. Outbound data operations are handled via a custom Next.js App Router API Route (`POST /api/newsletter`) with strict regex input validation, structured JSON error/success responses, and graceful error handling.

---

## 🛠️ CMS Platform Used

- **CMS**: **Strapi v5** (Headless REST API)
- **Data Structure**:
  - Single Types: `Homepage` (Dynamic Zone with 8 sections) & `Global` (Navbar & Footer configuration)
  - Components: `sections.hero-section`, `sections.about-section`, `sections.brands-section`, `sections.industries-section`, `sections.features-section`, `sections.projects-section`, `sections.news-section`, `sections.cta-section`, `shared.seo`.

---

## 🔌 API Endpoints Created & Integrated

### 1. Custom Backend API Endpoint (`POST /api/newsletter`)
- **Route**: `/api/newsletter`
- **Method**: `POST`
- **Features**: Input validation (email regex format check), structured HTTP 200/400 JSON responses, real-time UI feedback states.
- **Payload**:
  ```json
  {
    "email": "user@example.com"
  }
  ```

### 2. External Public API Integration (JSONPlaceholder REST API)
- **Endpoint**: `https://jsonplaceholder.typicode.com/posts?_limit=3`
- **Features**: Fetches remote third-party data on the server, parses posts, and seamlessly passes fallback/supplementary insights to the `NewsSection` component with `try/catch` graceful error degradation.

---

## ⭐ Bonus Features Implemented

1. **Dynamic SEO Metadata**: Server-side `generateMetadata()` driven dynamically by Strapi `seo` component (`metaTitle`, `metaDescription`, `keywords`, OpenGraph tags) with fallback templates.
2. **Infinite Continuous Carousel**: Dynamic step-width tracking via `getBoundingClientRect()` for continuous 60fps edge-to-edge project card slider.
3. **Responsive Container Architecture**: Strict 1280px and 1440px container max-widths with fluid typography (`clamp()`) matching Figma desktop, tablet, and mobile specs.
4. **Performance Caching (ISR)**: Next.js fetch revalidation policies (`revalidate: 60`).

---

## 💻 Local Setup Instructions

### 1. Clone & Setup Strapi CMS
```bash
git clone https://github.com/rishiksinha59/gomo-cms.git
cd gomo-cms
npm install
npm run build
npm run develop
```
- CMS Admin will open at `http://localhost:1337/admin`.

### 2. Clone & Setup Next.js Frontend
```bash
git clone https://github.com/rishiksinha59/gomo-homepage.git
cd gomo-homepage
npm install
```
- Create `.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```
- Run development server:
```bash
npm run dev
```
- Open `http://localhost:3000` in browser.
