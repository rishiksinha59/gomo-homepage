"use client";

import Link from "next/link";
import { ChevronDown, ShoppingCart, Menu } from "lucide-react";
import { NavbarData } from "@/lib/types";
import Container from "./Container";

interface NavbarProps {
  data?: NavbarData | null;
}

export default function Navbar({ data }: NavbarProps) {
  if (!data) return null;

  return (
    <header className="w-full bg-brand-cream text-brand-dark sticky top-0 z-50">
      <Container className="py-6 flex items-center justify-between">
        
        {/* Left Section: Logo + Navlinks */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          {data.logo_text && (
            <Link href="/" className="text-2xl md:text-[32px] font-bold tracking-tight text-brand-dark hover:opacity-90">
              {data.logo_text}
            </Link>
          )}

          {/* Navlinks */}
          {data.nav_links && data.nav_links.length > 0 && (
            <nav className="hidden lg:flex items-center gap-6">
              {data.nav_links.map((link) => (
                <Link
                  key={link.id}
                  href={link.url || "#"}
                  className="text-brand-dark text-sm font-normal hover:opacity-75 flex items-center transition-opacity"
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
        <div className="flex items-center gap-4">
          {data.show_language_switcher && (
            <button
              type="button"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-dark hover:opacity-80 transition-opacity"
            >
              <span>En</span>
              <ChevronDown className="w-4 h-4 opacity-70 stroke-[1.75]" />
            </button>
          )}

          {data.cta_label && (
            <Link
              href="/contact"
              className="bg-brand-dark hover:bg-brand-dark-hover text-white px-9 py-[14px] rounded-full text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
            >
              {data.cta_label}
            </Link>
          )}

          {data.show_cart && (
            <button
              type="button"
              aria-label="Shopping Cart"
              className="p-1 text-brand-dark hover:opacity-80 transition-opacity"
            >
              <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
            </button>
          )}

          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="p-1 text-brand-dark hover:opacity-80 transition-opacity lg:hidden"
          >
            <Menu className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

      </Container>
    </header>
  );
}