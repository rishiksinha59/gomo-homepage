import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AboutSectionData } from "@/lib/types";
import { getStrapiMedia } from "@/lib/strapi";
import Container from "./Container";

interface AboutSectionProps {
  data: AboutSectionData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  if (!data) return null;

  const imageUrl = getStrapiMedia(data.image?.url);

  return (
    <section className="w-full">
      <Container>
        
        {/* Outer 1280px Max-Width Wrapper */}
        <div className="max-w-[1280px] mx-auto w-full">

          {/* 1. Header Section */}
          <div className="text-center max-w-[920px] mx-auto">
            {data.tagline && (
              <p className="font-larken font-thin text-dark mb-4">
                {data.tagline}
              </p>
            )}

            {data.heading && (
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.25] text-brand-dark">
                {data.heading}
              </h2>
            )}

            {data.cta_label && (
              <div className="mt-6">
                <Link
                  href="/about"
                  className="inline-flex items-center text-xs font-normal text-dark underline underline-offset-4 transition-colors"
                >
                  <span>{data.cta_label}</span>
                  {data.cta_icon && <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" />}
                </Link>
              </div>
            )}
          </div>

          {/* 2. Middle Content Flex (568px x 320px Image + Descriptions) */}
          <div className="mt-14 sm:mt-16 flex flex-col lg:flex-row items-start gap-10 lg:gap-20">

            {/* Left: Feature Image (568px x 320px) */}
            <div className="relative w-full lg:w-[568px] h-[320px] rounded-[10px] overflow-hidden shadow-sm shrink-0">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={data.heading || "About Section Image"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 568px"
                  className="object-cover object-center"
                />
              ) : null}
            </div>

            {/* Right: Paragraph Descriptions */}
            <div className="flex-1 space-y-6 text-dark font-sans text-sm sm:text-base leading-6 max-w-[520px]">
              {data.description_1 && (
                <p className="whitespace-pre-line text-dark">
                  {data.description_1}
                </p>
              )}

              {data.description_2 && (
                <p className="whitespace-pre-line text-dark">
                  {data.description_2}
                </p>
              )}
            </div>

          </div>

          {/* 3. Bottom Stats Row (Flexbox with border divider) */}
          {data.stats && data.stats.length > 0 && (
            <div className="border-t border-brand-dark/35 mt-10 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-8 md:gap-12">
                {data.stats.map((stat, idx) => (
                  <div key={`${stat.id || idx}-${idx}`} className="flex flex-col text-left gap-1">
                    {stat.value && (
                      <span className="font-larken font-normal text-[56px] md:text-[64px] tracking-tight text-brand-dark leading-none mb-3">
                        {stat.value}
                      </span>
                    )}
                    {stat.label && (
                      <span className="font-larken font-light text-sm sm:text-base text-dark">
                        {stat.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </Container>
    </section>
  );
}
