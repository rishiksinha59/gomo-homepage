"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ShoppingCart, Menu, X } from "lucide-react";
import { NavbarData } from "@/lib/types";
import Container from "./Container";

interface NavbarProps {
  data?: NavbarData | null;
}

export default function Navbar({ data }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!data) return null;

  return (
    <header className="w-full bg-brand-cream text-brand-dark sticky top-0 z-50">
      <Container className="py-4 md:py-6 flex items-center justify-between">
        
        {/* Left Section: Logo + Navlinks */}
        <div className="flex items-center gap-6 xl:gap-10">
          {/* Logo - 32px on wide desktop, scaled down to 24px (text-2xl) on mobile/tablet */}
          {data.logo_text && (
            <Link
              href="/"
              className="text-2xl xl:text-[32px] font-bold tracking-tight text-brand-dark hover:opacity-90 transition-opacity"
            >
              {data.logo_text}
            </Link>
          )}

          {/* Desktop Navlinks (Visible on 1280px+ wide desktop to prevent tablet crowding) */}
          {data.nav_links && data.nav_links.length > 0 && (
            <nav className="hidden xl:flex items-center gap-5 xl:gap-6">
              {data.nav_links.map((link) => (
                <Link
                  key={link.id}
                  href={link.url || "#"}
                  className="text-brand-dark text-sm font-normal hover:opacity-75 flex items-center transition-opacity whitespace-nowrap"
                >
                  <span>{link.label}</span>
                  {link.has_dropdown && (
                    <ChevronDown className="w-4 h-4 ml-1 opacity-70 stroke-[1.75]" />
                  )}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Switcher */}
          {data.show_language_switcher && (
            <button
              type="button"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-dark hover:opacity-80 transition-opacity"
            >
              <span>En</span>
              <ChevronDown className="w-4 h-4 opacity-70 stroke-[1.75]" />
            </button>
          )}

          {/* Contact Us CTA Button - Responsive padding for tablet/desktop */}
          {data.cta_label && (
            <Link
              href="/contact"
              className="bg-brand-dark hover:bg-brand-dark-hover text-white px-5 py-2.5 xl:px-9 xl:py-[14px] rounded-full font-medium transition-colors shadow-xs whitespace-nowrap"
            >
              {data.cta_label}
            </Link>
          )}

          {/* Cart Icon */}
          {data.show_cart && (
            <button
              type="button"
              aria-label="Shopping Cart"
              className="p-1 text-brand-dark hover:opacity-80 transition-opacity"
            >
              <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
            </button>
          )}

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-brand-dark hover:opacity-80 transition-opacity xl:hidden"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile & Tablet Drawer Menu (< 1280px) */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-brand-cream border-t border-brand-dark/10 px-4 py-6 shadow-md transition-all">
          <Container className="flex flex-col gap-5">
            {/* Nav links */}
            {data.nav_links && data.nav_links.length > 0 && (
              <nav className="flex flex-col gap-4">
                {data.nav_links.map((link) => (
                  <Link
                    key={link.id}
                    href={link.url || "#"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-brand-dark text-sm font-medium hover:opacity-75 flex items-center justify-between py-1 transition-opacity"
                  >
                    <span>{link.label}</span>
                    {link.has_dropdown && (
                      <ChevronDown className="w-4 h-4 opacity-70 stroke-[1.75]" />
                    )}
                  </Link>
                ))}
              </nav>
            )}

            {/* Mobile Actions */}
            <div className="flex items-center justify-between pt-2">
              {data.show_language_switcher && (
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-brand-dark opacity-80"
                >
                  <span>Language: English</span>
                  <ChevronDown className="w-4 h-4 opacity-70" />
                </button>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}