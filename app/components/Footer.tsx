"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FooterData } from "@/lib/types";
import { getStrapiMedia } from "@/lib/strapi";

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
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

  return (
    <footer className="w-full bg-brand-footer text-brand-cream font-sans border-t border-white/10 mt-[120px]">
      
      {/* 1. Giant Brand Header Banner */}
      {data.brand_text && (
        <div className="w-full overflow-hidden px-6 pt-10 md:pt-16 pb-6 border-b border-white/10">
          <h1 className="text-[] leading-[0.8] font-black tracking-tighter text-brand-watermark select-none text-center uppercase">
            {data.brand_text}
          </h1>
        </div>
      )}

      {/* 2. Main Footer Content Grid (Explicit 1440px Container) */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Dynamic Navigation Columns */}
          {data.columns && data.columns.length > 0 && (
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {data.columns.map((col) => (
                <div key={col.id} className="flex flex-col">
                  <h3 className="text-base font-semibold text-brand-white mb-5 tracking-wide">
                    {col.title}
                  </h3>
                  <ul className="space-y-3 text-sm text-brand-cream">
                    {col.links && col.links.map((link) => (
                      <li key={link.id}>
                        <Link
                          href={link.url || "#"}
                          className="hover:text-brand-white transition-colors block py-0.5"
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

          {/* Contact Info Column */}
          <div className="lg:col-span-3 flex flex-col space-y-5 text-sm text-brand-cream">
            <h3 className="text-base font-semibold text-brand-white mb-2">Contact</h3>
            
            {data.phone && (
              <a href={`tel:${data.phone}`} className="hover:text-brand-white transition-colors block">
                {data.phone}
              </a>
            )}

            {data.email && (
              <a href={`mailto:${data.email}`} className="hover:text-brand-white transition-colors block underline">
                {data.email}
              </a>
            )}

            {data.visiting_address && (
              <div className="pt-2">
                <span className="text-xs uppercase tracking-wider text-brand-cream/60 font-medium block mb-1">
                  Visiting address
                </span>
                <p className="whitespace-pre-line text-brand-cream leading-relaxed">
                  {data.visiting_address}
                </p>
              </div>
            )}

            {data.postal_address && (
              <div className="pt-2">
                <span className="text-xs uppercase tracking-wider text-brand-cream/60 font-medium block mb-1">
                  Postal address
                </span>
                <p className="whitespace-pre-line text-brand-cream leading-relaxed">
                  {data.postal_address}
                </p>
              </div>
            )}
          </div>

          {/* Newsletter, Certifications & Social Icons Column */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-8">
            {data.newsletter_title && (
              <div>
                <h3 className="text-2xl md:text-3xl font-serif text-brand-sky leading-snug font-normal mb-6">
                  {data.newsletter_title}
                </h3>

                <form onSubmit={(e) => e.preventDefault()} className="relative border-b border-brand-cream/30 pb-2">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-transparent text-sm text-brand-white placeholder-brand-cream/50 focus:outline-none pr-8"
                    required
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-0 top-0 text-brand-cream/70 hover:text-brand-white transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 stroke-[1.5]" />
                  </button>
                </form>
              </div>
            )}

            {/* Certifications and Social Icons Row */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-4">
              {/* Certification Logos */}
              {data.certification_logos && data.certification_logos.length > 0 && (
                <div className="flex items-center gap-3">
                  {data.certification_logos.map((logo) => {
                    const mediaUrl = getStrapiMedia(logo.url);
                    return mediaUrl ? (
                      <div key={logo.id} className="relative w-12 h-12">
                        <Image
                          src={mediaUrl}
                          alt={logo.name || "ISO Certification Logo"}
                          fill
                          className="object-contain filter invert opacity-80"
                        />
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              {/* Social Links */}
              {data.social_links && data.social_links.length > 0 && (
                <div className="flex items-center gap-2">
                  {data.social_links.map((s) => (
                    <a
                      key={s.id}
                      href={s.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="w-9 h-9 rounded-full border border-brand-cream/30 flex items-center justify-center text-brand-cream hover:border-brand-white hover:text-brand-white transition-colors"
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

      {/* 3. Bottom Accent Bar in Brand Mauve (#A68AA4) (Explicit 1440px Container) */}
      {bottomBar && (
        <div className="w-full bg-brand-mauve text-[#2C242A] py-3.5 text-xs font-serif">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            {bottomBar.rights_reserved && (
              <div>{bottomBar.rights_reserved}</div>
            )}

            {bottomBar.copyright_text && (
              <div>{bottomBar.copyright_text}</div>
            )}

            {bottomBar.legal_links && bottomBar.legal_links.length > 0 && (
              <div className="flex items-center gap-3">
                {bottomBar.legal_links.map((link, idx) => (
                  <span key={link.id} className="flex items-center">
                    <Link href={link.url || "#"} className="hover:underline">
                      {link.label}
                    </Link>
                    {idx < (bottomBar.legal_links?.length || 0) - 1 && (
                      <span className="mx-2 opacity-60">|</span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </footer>
  );
}
