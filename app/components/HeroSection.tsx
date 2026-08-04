import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { HeroSectionData } from "@/lib/types";
import { getStrapiMedia } from "@/lib/strapi";
import Container from "./Container";

interface HeroSectionProps {
  data: HeroSectionData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  if (!data) return null;

  const bgImageUrl = getStrapiMedia(data.background_image?.url);

  return (
    <section className="w-full">
      <Container>
        {/* Responsive Hero Card Container with exact 36px top & bottom edge padding */}
        <div className="w-full min-h-[520px] sm:h-[620px] lg:h-[740px] rounded-[11px] overflow-hidden relative text-white flex flex-col justify-between pt-[36px] pb-[36px] px-6 sm:px-10 lg:px-14 shadow-lg bg-[#2E2822]">
          
          {/* Background Image Layer */}
          {bgImageUrl && (
            <Image
              src={bgImageUrl}
              alt={data.heading || "Hero Background"}
              fill
              priority
              fetchPriority="high"
              loading="eager"
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1360px"
              className="object-cover object-center"
            />
          )}

          {/* Dark Overlay for Text Legibility */}
          <div className="absolute inset-0 z-10" />

          {/* Content Layer (Relative z-20) */}
          {/* Top Tagline (36px distance from top edge of parent container) */}
          <div className="relative z-20 text-center">
            {data.tagline && (
              <p className="font-larken font-thin text-sm sm:text-base md:text-2xl text-white tracking-wide">
                {data.tagline}
              </p>
            )}
          </div>

          {/* Center Giant Heading (Inter Font Bold) */}
          <div className="relative z-20 text-center my-auto py-4 sm:py-0">
            {data.heading && (
              <h1 className="font-sans text-5xl sm:text-7xl md:text-9xl lg:text-[180.42px] font-bold text-brand-cream select-none leading-none">
                {data.heading}
              </h1>
            )}
          </div>

          {/* Bottom Subheading & Scroll Arrow Indicator (36px distance from bottom edge of parent container) */}
          <div className="relative z-20 text-center flex flex-col items-center gap-3 sm:gap-2">
            {data.subheading && (
              <p className="font-larken text-sm sm:text-base md:text-2xl text-brand-cream whitespace-pre-line max-w-[376px] w-full min-h-[84px] mx-auto leading-[28px]">
                {data.subheading}
              </p>
            )}

            {data.show_scroll_indicator && (
              <button
                type="button"
                aria-label="Scroll to next section"
                className="text-brand-cream/80 hover:text-white transition-opacity"
              >
                <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
              </button>
            )}
          </div>

        </div>
      </Container>
    </section>
  );
}
