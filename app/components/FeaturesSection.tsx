"use client";

import Image from "next/image";
import Link from "next/link";
import { Puzzle, Cog, Award, Target, ArrowRight } from "lucide-react";
import { FeaturesSectionData } from "@/lib/types";
import { getStrapiMedia } from "@/lib/strapi";
import Container from "./Container";

interface FeaturesSectionProps {
  data: FeaturesSectionData;
}

// Fallback icons matching Figma design icons when media icon is not set in Strapi
const FALLBACK_ICONS = [Puzzle, Cog, Award, Target];

export default function FeaturesSection({ data }: FeaturesSectionProps) {
  if (!data) return null;

  const features = data.features || [];

  return (
    <section className="w-full">
      <Container>

        {/* Outer Card Container with max-w-[1280px] container */}
        <div className="w-full max-w-[1280px] mx-auto bg-[#B8D1D1] rounded-[10px] overflow-hidden text-brand-dark shadow-xs border border-brand-dark/10">

          {/* 1. Top Header Area */}
          <div className="pt-12 sm:pt-20 pb-12 sm:pb-16 px-6 sm:px-10 text-center max-w-[850px] mx-auto flex flex-col items-center">
            {data.tagline && (
              <p className="font-larken font-thin text-dark text-sm sm:text-base mb-4 tracking-wide">
                {data.tagline}
              </p>
            )}

            {data.heading && (
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl text-center font-normal leading-[1.25] px-10 text-brand-dark tracking-tight mb-6">
                {data.heading}
              </h2>
            )}

            {data.cta_label && (
              <Link
                href={data.cta_url || "/contact"}
                className="inline-flex items-center gap-1.5 text-xs  font-normal text-brand-dark underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                <span>{data.cta_label}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" />
              </Link>
            )}
          </div>

          {/* 2. Bottom 4-Column Responsive Features Grid */}
          {features.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-brand-dark/15 divide-y sm:divide-y-0 sm:divide-x divide-brand-dark/15">
              {features.map((feature, idx) => {
                const iconUrl = getStrapiMedia(feature.icon?.url);
                const FallbackIcon = FALLBACK_ICONS[idx % FALLBACK_ICONS.length];

                return (
                  <div
                    key={`${feature.id || idx}-${idx}`}
                    className="p-6 flex flex-col justify-between h-full min-h-[300px]"
                  >
                    {/* Top Icon */}
                    <div className="mb-10 text-brand-dark">
                      {iconUrl ? (
                        <Image
                          src={iconUrl}
                          alt={feature.title || "Feature Icon"}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <FallbackIcon className="w-8 h-8 stroke-[1.75]" />
                      )}
                    </div>

                    {/* Bottom Title & Description */}
                    <div>
                      {feature.title && (
                        <h3 className="font-sans font-medium text-lg sm:text-xl text-brand-dark tracking-tight mb-3">
                          {feature.title}
                        </h3>
                      )}
                      {feature.description && (
                        <p className="font-sans text-brand-dark/80 leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </Container>
    </section>
  );
}
