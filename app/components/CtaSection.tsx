import Image from "next/image";
import Link from "next/link";
import { CtaSectionData } from "@/lib/types";
import { getStrapiMedia } from "@/lib/strapi";
import Container from "./Container";

interface CtaSectionProps {
  data: CtaSectionData;
}

export default function CtaSection({ data }: CtaSectionProps) {
  if (!data) return null;

  const bgImageUrl = getStrapiMedia(data.background_image?.url);
  const logoUrl = getStrapiMedia(data.logo?.url);

  return (
    <section className="w-full">
      <Container>
        
        {/* Full Card Container with 1280px max-width matching Figma */}
        <div className="w-full max-w-[1280px] mx-auto h-[520px] sm:h-[600px] md:h-[656px] rounded-[10px] overflow-hidden relative text-white flex flex-col justify-center items-center text-center p-8 shadow-xl group">
          
          {/* Background Image Layer */}
          {bgImageUrl && (
            <Image
              src={bgImageUrl}
              alt={data.heading || "CTA Background Image"}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          )}

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/35 z-10" />

          {/* Content Layer (Relative z-20) */}
          <div className="relative z-20 flex flex-col items-center justify-center max-w-[750px] mx-auto text-center px-4">
            
            {/* Top Brand Logo Icon */}
            <div className="text-white">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="Brand Logo"
                  width={148}
                  height={148}
                  className=" object-contain mx-auto"
                />
              ) : (
                <svg
                  className="w-10 h-12 text-white mx-auto drop-shadow-sm"
                  viewBox="0 0 32 40"
                  fill="currentColor"
                >
                  <path d="M16 0C16 0 32 12 32 24C32 28.4183 28.4183 32 24 32C19.5817 32 16 28.4183 16 24C16 12 0 16 0 16C0 16 8 0 16 0Z" />
                </svg>
              )}
            </div>

            {/* Main Heading in Larken Thin */}
            {data.heading && (
              <h2 className="font-larken font-thin text-3xl sm:text-4xl md:text-5xl leading-[1.25] text-white tracking-tight mb-8 mt-6 max-w-[632px]">
                {data.heading}
              </h2>
            )}

            {/* Oval White CTA Button */}
            {data.cta_label && (
              <Link
                href={data.cta_url || "/contact"}
                prefetch={false}
                className="bg-white hover:bg-white/90 text-brand-dark font-sans text-sm sm:text-base font-normal px-9 py-3.5 rounded-full shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {data.cta_label}
              </Link>
            )}

          </div>

        </div>

      </Container>
    </section>
  );
}
