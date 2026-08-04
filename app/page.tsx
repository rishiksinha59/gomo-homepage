import type { Metadata } from "next";
import { getHomepageData } from "@/lib/strapi";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import BrandsSection from "./components/BrandsSection";
import IndustriesSection from "./components/IndustriesSection";
import FeaturesSection from "./components/FeaturesSection";
import ProjectsSection from "./components/ProjectsSection";
import NewsSection from "./components/NewsSection";
import CtaSection from "./components/CtaSection";
import { NewsSectionData } from "@/lib/types";

const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
  "sections.hero-section": HeroSection,
  "sections.about-section": AboutSection,
  "sections.brands-section": BrandsSection,
  "sections.industries-section": IndustriesSection,
  "sections.features-section": FeaturesSection,
  "sections.projects-section": ProjectsSection,
  "sections.news-section": NewsSection,
  "sections.cta-section": CtaSection,
};

// Requirement 5: External Public API Fetcher (JSONPlaceholder) with Graceful Fallback
async function getExternalNewsData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const posts = await res.json();
    return posts;
  } catch (error) {
    console.error("External Public API fetch failed gracefully:", error);
    return [];
  }
}

// Requirement 2 & Bonus: Dynamic SEO Metadata from Strapi Single Type
export async function generateMetadata(): Promise<Metadata> {
  const homepageData = await getHomepageData();
  const seo = homepageData?.seo;

  const title = seo?.metaTitle || "GO MO Group | Premium Digital & Brand Experience";
  const description =
    seo?.metaDescription ||
    "Transforming brands with cutting-edge digital experiences, UI/UX design, and scalable web solutions.";
  const keywords = seo?.keywords || "gomo, digital agency, nextjs, strapi, web development, brand experience";

  // Extract shareImage from Strapi dynamic SEO (handles both Single Media object & Multiple Media array)
  const shareImageObj = Array.isArray(seo?.shareImage) ? seo?.shareImage[0] : seo?.shareImage;
  const strapiMediaUrl = shareImageObj?.url;
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "https://gomo-cms.onrender.com";

  const ogImageUrl = strapiMediaUrl
    ? (strapiMediaUrl.startsWith("http")
        ? strapiMediaUrl
        : `${strapiBaseUrl}${strapiMediaUrl.startsWith("/") ? "" : "/"}${strapiMediaUrl}`)
    : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "GO MO Group",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function Home() {
  const [homepageData, externalPosts] = await Promise.all([
    getHomepageData(),
    getExternalNewsData(),
  ]);

  console.log(
    `[External API Integration] Successfully fetched ${externalPosts.length} posts from JSONPlaceholder API`
  );

  const sections = homepageData?.sections || [];

  return (
    <div className="w-full flex flex-col gap-[120px]">
      {sections.map((section, index) => {
        const Component = SECTION_COMPONENTS[section.__component];

        // Gracefully ignore unknown or unhandled dynamic zone components
        if (!Component) return null;

        const uniqueKey =
          (section as { documentId?: string }).documentId ||
          `${section.__component}-${section.id || index}-${index}`;

        if (section.__component === "sections.news-section") {
          return (
            <Component
              key={uniqueKey}
              data={section as NewsSectionData}
              externalPosts={externalPosts}
            />
          );
        }

        return <Component key={uniqueKey} data={section} />;
      })}
    </div>
  );
}
