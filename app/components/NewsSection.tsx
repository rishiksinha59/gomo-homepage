"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { NewsSectionData } from "@/lib/types";
import { getStrapiMedia } from "@/lib/strapi";
import Container from "./Container";

interface NewsSectionProps {
  data: NewsSectionData;
  externalPosts?: Array<{ id: number; title: string; body: string }>;
}

/**
 * Format ISO date string into readable format like "May 7, 2025"
 */
function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function NewsSection({ data, externalPosts }: NewsSectionProps) {
  if (!data) return null;

  // Primary: Strapi CMS articles. Secondary fallback: External JSONPlaceholder API posts
  const articles = (data.articles && data.articles.length > 0)
    ? data.articles
    : (externalPosts || []).map((post) => ({
        id: post.id,
        title: post.title,
        date: new Date().toISOString(),
        badge: "External Insight",
        cta_label: "Read article",
        cta_url: `/news/${post.id}`,
        image: null,
      }));

  if (articles.length === 0) return null;

  return (
    <section className="w-full">
      <Container>

        {/* 1. Header Section */}
        <div className="text-center max-w-[880px] mx-auto mb-12 sm:mb-16 flex flex-col items-center">
          {data.tagline && (
            <p className="font-larken font-thin text-dark text-sm sm:text-base mb-3.5 tracking-wide">
              {data.tagline}
            </p>
          )}

          {data.heading && (
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl text-center font-normal leading-[1.25] text-brand-dark tracking-tight mb-6">
              {data.heading}
            </h2>
          )}

          {data.cta_label && (
            <Link
              href={data.cta_url || "/news"}
              className="inline-flex items-center gap-1.5 text-xs  font-normal text-brand-dark underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              <span>{data.cta_label}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" />
            </Link>
          )}
        </div>

        {/* 2. Responsive Articles Grid (1-col on mobile, 2-col on tablet, 3-col on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch w-full max-w-[1280px] mx-auto">
          {articles.map((article, idx) => {
            const imageUrl = getStrapiMedia(article.image?.url);
            const formattedDate = formatDate(article.date);

            return (
              <div
                key={`${article.id || idx}-${idx}`}
                className="relative rounded-[10px] overflow-hidden min-h-[380px] sm:min-h-[400px] lg:h-[416px] w-full shadow-lg text-white group cursor-pointer transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Badge Pill */}
                {article.badge && (
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
                    <span className="bg-black/35 backdrop-blur-md text-white/90 text-xs px-3 py-1 sm:py-1.5 rounded-full border border-white/15 font-sans tracking-wide">
                      {article.badge}
                    </span>
                  </div>
                )}

                {/* Background Image Layer */}
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={article.title || "Article Image"}
                    fill
                    priority={idx < 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}

                {/* Frosted Glass Overlay (Auto-height bottom anchored) */}
                <div className="absolute inset-x-0 bottom-0 z-10 bg-black/35 backdrop-blur-xl border-t border-white/15 flex flex-col justify-between">

                  {/* Article Title */}
                  <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-6 sm:pb-8">
                    {article.title && (
                      <h3 className="font-sans text-base sm:text-lg lg:text-xl font-normal leading-snug tracking-tight text-white line-clamp-3 lg:line-clamp-none">
                        {article.title}
                      </h3>
                    )}
                  </div>

                  {/* Bottom Info & CTA Bar with vertical divider line */}
                  <div className="border-t border-white/15 flex items-stretch h-[48px] sm:h-[52px] font-sans text-white/90">
                    <div className="flex-1 px-4 sm:px-6 flex items-center border-r border-white/15 min-w-0">
                      <span className="text-white/80 font-sans text-xs sm:text-sm truncate">
                        {formattedDate}
                      </span>
                    </div>

                    <div className="px-4 sm:px-6 flex items-center shrink-0">
                      <Link
                        href={article.cta_url || "#"}
                        className="inline-flex items-center gap-1 text-white hover:underline font-medium text-xs sm:text-sm shrink-0 group/link"
                      >
                        <span>{article.cta_label || "Read more"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" />
                      </Link>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
