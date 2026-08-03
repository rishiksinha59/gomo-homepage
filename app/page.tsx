import { getHomepageData } from "@/lib/strapi";
import HeroSection from "./components/HeroSection";
import { HeroSectionData } from "@/lib/types";

export default async function Home() {
  const homepageData = await getHomepageData();
  const sections = homepageData?.sections || [];

  return (
    <main className="w-full">
      {sections.map((section) => {
        if (section.__component === "sections.hero-section") {
          return <HeroSection key={section.id} data={section as HeroSectionData} />;
        }
        return null;
      })}
    </main>
  );
}
