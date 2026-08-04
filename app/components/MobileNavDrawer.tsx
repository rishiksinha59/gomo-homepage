"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import { NavbarData } from "@/lib/types";
import Container from "./Container";

interface MobileNavDrawerProps {
  data: NavbarData;
}

export default function MobileNavDrawer({ data }: MobileNavDrawerProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile & Tablet Hamburger Toggle Button */}
      <button
        type="button"
        aria-label="Toggle navigation menu"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="p-1 text-brand-dark hover:opacity-80 transition-opacity xl:hidden cursor-pointer flex items-center justify-center"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6 stroke-[1.5]" />
        ) : (
          <Image
            src="/hamburger.svg"
            alt="Menu"
            width={28}
            height={20}
            className="w-7 h-5 shrink-0"
          />
        )}
      </button>

      {/* Mobile & Tablet Drawer Menu (< 1280px) */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-cream border-t border-brand-dark/10 px-4 py-6 shadow-md transition-all z-50 xl:hidden">
          <Container className="flex flex-col gap-5">
            {/* Nav links */}
            {data.nav_links && data.nav_links.length > 0 && (
              <nav className="flex flex-col gap-4">
                {data.nav_links.map((link) => (
                  <Link
                    key={link.id}
                    href={link.url || "#"}
                    prefetch={false}
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
    </>
  );
}
