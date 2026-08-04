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
import {
  HeroSectionData,
  AboutSectionData,
  BrandsSectionData,
  IndustriesSectionData,
  FeaturesSectionData,
  ProjectsSectionData,
  NewsSectionData,
  CtaSectionData,
} from "@/lib/types";

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

  // Extract shareImage from Strapi dynamic SEO or fallback to premium brand visual
  const strapiMediaUrl = seo?.shareImage?.[0]?.url;
  const ogImageUrl = strapiMediaUrl
    ? (strapiMediaUrl.startsWith("http")
        ? strapiMediaUrl
        : `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${strapiMediaUrl}`)
    : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop";

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : null) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "http://localhost:3000";

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
        const uniqueKey =
          (section as { documentId?: string }).documentId ||
          `${section.__component}-${section.id || index}-${index}`;

        if (section.__component === "sections.hero-section") {
          return <HeroSection key={uniqueKey} data={section as HeroSectionData} />;
        }
        if (section.__component === "sections.about-section") {
          return <AboutSection key={uniqueKey} data={section as AboutSectionData} />;
        }
        if (section.__component === "sections.brands-section") {
          return <BrandsSection key={uniqueKey} data={section as BrandsSectionData} />;
        }
        if (section.__component === "sections.industries-section") {
          return <IndustriesSection key={uniqueKey} data={section as IndustriesSectionData} />;
        }
        if (section.__component === "sections.features-section") {
          return <FeaturesSection key={uniqueKey} data={section as FeaturesSectionData} />;
        }
        if (section.__component === "sections.projects-section") {
          return <ProjectsSection key={uniqueKey} data={section as ProjectsSectionData} />;
        }
        if (section.__component === "sections.news-section") {
          return (
            <NewsSection
              key={uniqueKey}
              data={section as NewsSectionData}
              externalPosts={externalPosts}
            />
          );
        }
        if (section.__component === "sections.cta-section") {
          return <CtaSection key={uniqueKey} data={section as CtaSectionData} />;
        }
        return null;
      })}
    </div>
  );
}
