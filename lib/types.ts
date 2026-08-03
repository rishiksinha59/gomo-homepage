export interface NavLink {
  id: number;
  label: string;
  url: string;
  is_external?: boolean;
  has_dropdown?: boolean | null;
}

export interface NavbarData {
  id: number;
  logo_text?: string;
  nav_links?: NavLink[];
  cta_label?: string;
  show_cart?: boolean;
  show_language_switcher?: boolean;
}

export interface FooterColumn {
  id: number;
  title: string;
  links?: NavLink[];
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

export interface BottomBar {
  id: number;
  copyright_text?: string;
  rights_reserved?: string;
  legal_links?: NavLink[];
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  url: string;
  width?: number;
  height?: number;
  formats?: Record<string, StrapiMediaFormat>;
}

export interface FooterData {
  id: number;
  brand_text?: string;
  phone?: string;
  email?: string;
  visiting_address?: string;
  postal_address?: string;
  newsletter_title?: string;
  columns?: FooterColumn[];
  social_links?: SocialLink[];
  certification_logos?: StrapiMedia[];
  CopyRightText?: BottomBar[] | BottomBar;
}

export interface GlobalAttributes {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  navbar?: NavbarData;
  footer?: FooterData;
}

export interface HeroSectionData {
  id: number;
  __component: "sections.hero-section";
  heading?: string;
  tagline?: string;
  subheading?: string;
  background_image?: StrapiMedia;
  show_scroll_indicator?: boolean;
  scroll_target?: string;
}

export type SectionData = HeroSectionData | { id: number; __component: string; [key: string]: unknown };

export interface HomepageAttributes {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sections?: SectionData[];
}

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}
