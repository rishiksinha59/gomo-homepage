"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { IndustriesSectionData } from "@/lib/types";
import { getStrapiMedia } from "@/lib/strapi";
import Container from "./Container";

interface IndustriesSectionProps {
  data: IndustriesSectionData;
}

export default function IndustriesSection({ data }: IndustriesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data) return null;

  const industries = data.industries || [];
  if (industries.length === 0) return null;

  const activeIndustry = industries[activeIndex] || industries[0];
  const activeImageUrl = getStrapiMedia(activeIndustry.image?.url);

  return (
    <section className="w-full">
      <Container>

        {/* 1. Header Section */}
        <div className="text-center max-w-[880px] mx-auto mb-12 sm:mb-16">
          {data.tagline && (
            <p className="font-larken font-thin text-dark mb-4">
              {data.tagline}
            </p>
          )}

          {data.heading && (
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl text-center font-normal leading-[1.25] text-brand-dark tracking-tight">
              {data.heading}
            </h2>
          )}
        </div>

        {/* 2. Responsive 2-Column Card Layout (Exact 1279px parent width with 15px gap for 632px cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[15px] items-stretch w-full max-w-[1279px] mx-auto">

          {/* Left Column: Interactive Industry Selection Menu */}
          <div className="bg-brand-dark rounded-[10px] p-8 md:p-12 flex flex-col justify-between min-h-[480px] lg:h-[570px] w-full shadow-lg text-white">
            <div className="flex flex-col my-auto space-y-3 lg:space-y-4">
              {industries.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className="w-full text-left flex items-center justify-between group transition-all duration-200 outline-none"
                  >
                    <span
                      className={`font-larken transition-colors duration-200 ${
                        isActive
                          ? "text-2xl sm:text-3xl md:text-[38px] text-white font-normal"
                          : "text-xl sm:text-2xl md:text-[34px] text-white/35 group-hover:text-white/70 font-normal"
                      }`}
                    >
                      {item.name}
                    </span>

                    {isActive && (
                      <ArrowRight className="w-6 h-6 text-white stroke-[1.75] shrink-0 ml-4" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Industry Preview Card with Frosted Glass Overlay */}
          <div className="relative rounded-[10px] overflow-hidden min-h-[480px] lg:h-[570px] w-full shadow-lg text-white bg-dark group">

            {/* Background Image Layer */}
            {activeImageUrl ? (
              <Image
                key={activeIndustry.id}
                src={activeImageUrl}
                alt={activeIndustry.name || "Industry Preview Image"}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 680px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            ) : null}

            {/* Frosted Glassmorphism Overlay Box (Natural height auto-sizing overlay anchored at bottom) */}
            <div className="absolute inset-x-0 bottom-0 z-10 bg-black/35 backdrop-blur-xl border-t border-white/15 flex flex-col justify-between">

              {/* Content Area Inside Glass (Explicit 48px bottom spacing before CTA bar) */}
              <div className="p-6 pb-[48px] flex flex-col justify-start">

                {/* Active Industry Title */}
                {activeIndustry.name && (
                  <h3 className="font-sans font-normal text-2xl md:text-3xl tracking-tight text-white mb-3">
                    {activeIndustry.name}
                  </h3>
                )}

                {/* Dynamic Tag Pills with Frosted Translucent Styling */}
                {activeIndustry.tags && activeIndustry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {activeIndustry.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-black/30 backdrop-blur-md text-white/90 text-xs px-3 py-1.5 rounded-full border border-white/15 font-sans tracking-wide"
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                )}

                {/* Active Industry Description */}
                {activeIndustry.description && (
                  <p className="font-sans text-sm md:text-base text-white/90 leading-relaxed max-w-md">
                    {activeIndustry.description}
                  </p>
                )}

              </div>

              {/* Bottom CTA Row with Vertical Divider Line matching Figma */}
              {activeIndustry.cta_label && (
                <div className="border-t border-white/15 flex items-center h-[53px]">
                  <div className="flex-1 h-full border-r border-white/15" />
                  <Link
                    href={activeIndustry.cta_url || "#"}
                    className="px-6 h-full flex items-center justify-center gap-2 font-sans text-white/90 hover:text-white transition-colors group/link hover:bg-white/5"
                  >
                    <span className="group-hover/link:underline">{activeIndustry.cta_label}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[1.75]" />
                  </Link>
                </div>
              )}

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}
