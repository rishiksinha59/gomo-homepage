import Link from "next/link";
import Image from "next/image";
import { FooterData } from "@/lib/types";
import { getStrapiMedia } from "@/lib/strapi";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "./icons/SocialIcons";
import NewsletterForm from "./NewsletterForm";

interface FooterProps {
  data?: FooterData | null;
}

export default function Footer({ data }: FooterProps) {
  if (!data) return null;

  const bottomBar = Array.isArray(data.CopyRightText) ? data.CopyRightText[0] : data.CopyRightText;

  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("instagram")) return <InstagramIcon className="w-4 h-4" />;
    if (p.includes("facebook")) return <FacebookIcon className="w-4 h-4" />;
    if (p.includes("linkedin")) return <LinkedinIcon className="w-4 h-4" />;
    return null;
  };

  const socialLinks = data.social_links || [];
  const legalLinks = bottomBar?.legal_links || [];

  return (
    <footer className="w-full bg-brand-footer text-white/80 font-sans border-t border-white/10 mt-[120px] overflow-hidden">

      {/* 1. Giant Wall-to-Wall Brand Watermark Header */}
      {data.brand_text && (
        <div className="w-full max-w-[1440px] mx-auto overflow-hidden select-none">
          <h2 className="text-brand-watermark font-bold font-sans whitespace-nowrap leading-none text-center text-[clamp(2.5rem,33.125vw,477px)]">
            {data.brand_text}
          </h2>
        </div>
      )}

      {/* 2. Main Footer Content Grid (1440px Container) */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 pb-[74px]">
        <div className="grid grid-cols-1 xl:grid-cols-[810px_1fr] gap-10 xl:gap-[146px]">

          {/* Left block: Nav + Contact (810px) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Dynamic Navigation Columns from Strapi */}
            {data.columns && data.columns.length > 0 && (
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-[1.35fr_1fr_1fr] gap-5">
                {data.columns.map((col) => (
                  <div key={col.id} className="flex flex-col">
                    <h3 className="text-xl font-normal text-white mb-6 font-sans">
                      {col.title}
                    </h3>
                    <ul className="space-y-4 text-brand-cream/70">
                      {col.links && col.links.map((link) => (
                        <li key={link.id}>
                          <Link
                            href={link.url || "#"}
                            prefetch={false}
                            className="hover:text-white transition-colors block font-sans whitespace-nowrap"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Dynamic Contact Info Column from Strapi */}
            <div className="flex flex-col space-y-6 text-brand-cream/70 font-sans">
              <h3 className="text-xl font-normal text-white mb-6 font-sans">Contact</h3>

              {data.phone && (
                <a href={`tel:${data.phone}`} className="hover:text-white transition-colors block">
                  {data.phone}
                </a>
              )}

              {data.email && (
                <a href={`mailto:${data.email}`} className="hover:text-white transition-colors block break-words">
                  {data.email}
                </a>
              )}

              {data.visiting_address && (
                <div>
                  <span className="text-brand-cream/70 block mb-2">
                    Visiting address
                  </span>
                  <p className="whitespace-pre-line text-brand-cream/70">
                    {data.visiting_address}
                  </p>
                </div>
              )}

              {data.postal_address && (
                <div>
                  <span className="text-white/50 font-medium block mb-2">
                    Postal address
                  </span>
                  <p className="whitespace-pre-line text-white/70">
                    {data.postal_address}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Newsletter, Certifications & Social Icons Column */}
          <div className="flex flex-col justify-between space-y-8">
            {data.newsletter_title && (
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.625rem] font-larken text-brand-sky leading-[1.25] tracking-tight mb-8">
                  {data.newsletter_title}
                </h3>

                <NewsletterForm />
              </div>
            )}

            {/* Certifications and Social Icons Row */}
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 xl:gap-4">
              {/* Certification Logos from Strapi */}
              {data.certification_logos && data.certification_logos.length > 0 && (
                <div className="flex items-center gap-4">
                  {data.certification_logos.map((logo) => {
                    const mediaUrl = getStrapiMedia(logo.url);
                    return mediaUrl ? (
                      <div key={logo.id} className="relative w-[160px] md:w-[183px] h-[82px] shrink-0">
                        <Image
                          src={mediaUrl}
                          alt={logo.name || "ISO Certification Logo"}
                          fill
                          sizes="183px"
                          unoptimized
                          className="object-contain object-left opacity-90"
                        />
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              {/* Dynamic Social Links from Strapi */}
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.id}
                      href={s.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-brand-dark transition-all duration-200"
                    >
                      {getSocialIcon(s.platform)}
                    </a>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>
      </div>

      {/* 3. Bottom Accent Bar in Mauve/Purple tone (1440px Container) */}
      <div className="w-full bg-brand-mauve text-brand-dark py-5.5 font-serif">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 xl:grid-cols-[810px_1fr] gap-4 xl:gap-[146px] items-center">

          {/* Left block (810px): Rights reserved (col-span-3) + Copyright (col 4, aligned with Contact) */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-2 sm:gap-4 xl:gap-8 items-center text-center xl:text-left">
            <div className="xl:col-span-3 text-center xl:text-left">
              {bottomBar?.rights_reserved || "All rights reserved"}
            </div>
            <div className="whitespace-nowrap w-fit mx-auto xl:mx-0 text-center xl:text-left">
              {bottomBar?.copyright_text || "© Brand 2026"}
            </div>
          </div>

          {/* Right block (404px): Legal links aligned to right */}
          {legalLinks.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap justify-center xl:justify-end">
              {legalLinks.map((link, idx) => (
                <span key={link.id} className="flex items-center">
                  <Link href={link.url || "#"} prefetch={false} className="hover:underline font-sans text-brand-dark">
                    {link.label}
                  </Link>
                  {idx < legalLinks.length - 1 && (
                    <span className="ml-1 opacity-60">|</span>
                  )}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>

    </footer>
  );
}
