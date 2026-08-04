import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { NavbarData } from "@/lib/types";
import Container from "./Container";
import MobileNavDrawer from "./MobileNavDrawer";

interface NavbarProps {
  data?: NavbarData | null;
}

export default function Navbar({ data }: NavbarProps) {
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
                  prefetch={false}
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
              prefetch={false}
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
              className="p-1 text-brand-dark hover:opacity-80 transition-opacity flex items-center justify-center"
            >
              <Image
                src="/cart.svg"
                alt="Shopping Cart"
                width={22}
                height={21}
                className="w-[22px] h-[21px] shrink-0"
              />
            </button>
          )}

          {/* Mobile & Tablet Hamburger Toggle & Drawer */}
          <MobileNavDrawer data={data} />
        </div>
      </Container>
    </header>
  );
}