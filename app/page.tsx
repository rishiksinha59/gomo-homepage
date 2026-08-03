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

export default async function Home() {
  const homepageData = await getHomepageData();
  const sections = homepageData?.sections || [];

  return (
    <div className="w-full flex flex-col gap-[120px]">
      {sections.map((section, index) => {
        // Use documentId if present on the entity, otherwise fall back to composite type-id-index key
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
          return <NewsSection key={uniqueKey} data={section as NewsSectionData} />;
        }
        if (section.__component === "sections.cta-section") {
          return <CtaSection key={uniqueKey} data={section as CtaSectionData} />;
        }
        return null;
      })}
    </div>
  );
}
