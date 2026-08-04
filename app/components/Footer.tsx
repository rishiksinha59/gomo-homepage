"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FooterData } from "@/lib/types";
import { getStrapiMedia } from "@/lib/strapi";

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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
    <footer className="w-full bg-brand-footer text-white/80 font-sans border-t border-white/10 mt-[120px]">

      {/* 1. Giant Wall-to-Wall Brand Watermark Header */}
      {data.brand_text && (
        <div className="w-full max-w-[1440px] mx-auto overflow-hidden select-none">
          <h2 className="text-brand-watermark font-bold font-sans whitespace-nowrap leading-none text-center text-[33.125vw]">
            {data.brand_text}
          </h2>
        </div>
      )}

      {/* 2. Main Footer Content Grid (1440px Container) */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 pb-[74px]">
        <div className="grid grid-cols-1 lg:grid-cols-[810px_1fr] gap-10 lg:gap-[146px]">

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
                <a href={`mailto:${data.email}`} className="hover:text-white transition-colors block">
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
                <h3 className="text-2xl sm:text-[2.625rem] font-larken text-brand-sky leading-[1.25] tracking-tight mb-8">
                  {data.newsletter_title}
                </h3>

                <form onSubmit={(e) => e.preventDefault()} className="relative border-b border-white/20 pb-2.5 flex items-center justify-between w-full">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-transparent text-brand-cream placeholder-brand-cream focus:outline-none pr-8 font-sans"
                    required
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 stroke-[1.75]" />
                  </button>
                </form>
              </div>
            )}

            {/* Certifications and Social Icons Row */}
            <div className="flex items-center justify-between gap-4">
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
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[810px_1fr] gap-4 lg:gap-[146px] items-center">

          {/* Left block (810px): Rights reserved (col-span-3) + Copyright (col 4, aligned with Contact) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center text-center sm:text-left">
            <div className="md:col-span-3">
              {bottomBar?.rights_reserved || "All rights reserved"}
            </div>
            <div className=" whitespace-nowrap w-fit">
              {bottomBar?.copyright_text || "© Brand 2026"}
            </div>
          </div>

          {/* Right block (404px): Legal links aligned to right */}
          {legalLinks.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap justify-center lg:justify-end">
              {legalLinks.map((link, idx) => (
                <span key={link.id} className="flex items-center">
                  <Link href={link.url || "#"} className="hover:underline font-sans text-brand-dark">
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
