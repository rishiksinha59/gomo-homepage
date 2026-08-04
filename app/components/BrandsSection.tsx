"use client";

import Image from "next/image";
import { BrandsSectionData } from "@/lib/types";
import { getStrapiMedia } from "@/lib/strapi";
import Container from "./Container";

interface BrandsSectionProps {
  data: BrandsSectionData;
}

export default function BrandsSection({ data }: BrandsSectionProps) {
  if (!data) return null;

  const brands = data.brands || [];
  if (brands.length === 0) return null;

  // Quadruple the dataset for seamless infinite looping across large screens
  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="w-full">
      {/* Centered Tagline in Container */}
      <Container>
        {data.tagline && (
          <h3 className="font-larken font-thin text-dark text-center mb-10">
            {data.tagline}
          </h3>
        )}
      </Container>

      {/* Smart Full-Width Overflow Marquee Track (Extends edge-to-edge beyond Container) */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden select-none">
        
        {/* Continuous Marquee Track */}
        <div className="animate-marquee flex items-center gap-4 sm:gap-6 px-4">
          {marqueeBrands.map((brand, index) => {
            const logoUrl = getStrapiMedia(brand.logo?.url);

            return (
              <div
                key={`${brand.id}-${index}`}
                className="border border-brand-dark/10 rounded-[14px] px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-center min-w-[200px] h-24 shadow-xs flex-shrink-0 hover:border-brand-dark/20 transition-all"
              >
                {logoUrl ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={logoUrl}
                      alt={brand.name || "Brand Logo"}
                      width={160}
                      height={60}
                      className="max-h-[38px] sm:max-h-[44px] w-auto object-contain filter grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all"
                    />
                  </div>
                ) : (
                  <span className="font-serif text-base sm:text-lg font-medium text-brand-dark tracking-tight">
                    {brand.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
