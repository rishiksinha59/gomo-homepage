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

export interface StatData {
  id: number;
  value?: string;
  label?: string;
}

export interface AboutSectionData {
  id: number;
  __component: "sections.about-section";
  tagline?: string;
  heading?: string;
  cta_label?: string;
  cta_icon?: boolean;
  image?: StrapiMedia;
  description_1?: string;
  description_2?: string;
  stats?: StatData[];
}

export interface BrandItemData {
  id: number;
  name?: string;
  logo?: StrapiMedia;
}

export interface BrandsSectionData {
  id: number;
  __component: "sections.brands-section";
  tagline?: string;
  brands?: BrandItemData[];
}

export interface TagData {
  id: number;
  label?: string;
}

export interface IndustryItemData {
  id: number;
  name?: string;
  description?: string;
  cta_label?: string;
  cta_url?: string;
  image?: StrapiMedia;
  tags?: TagData[];
}

export interface IndustriesSectionData {
  id: number;
  __component: "sections.industries-section";
  tagline?: string;
  heading?: string;
  industries?: IndustryItemData[];
}

export interface FeatureCardData {
  id: number;
  title?: string;
  description?: string;
  icon?: StrapiMedia;
}

export interface FeaturesSectionData {
  id: number;
  __component: "sections.features-section";
  tagline?: string;
  heading?: string;
  cta_label?: string;
  cta_url?: string;
  features?: FeatureCardData[];
}

export interface ProjectCardData {
  id: number;
  title?: string;
  subtitle?: string;
  cta_label?: string;
  cta_url?: string;
  image?: StrapiMedia;
}

export interface ProjectsSectionData {
  id: number;
  __component: "sections.projects-section";
  tagline?: string;
  heading?: string;
  cta_label?: string;
  cta_url?: string;
  projects?: ProjectCardData[];
}

export interface ArticleCardData {
  id: number;
  badge?: string;
  title?: string;
  date?: string;
  cta_label?: string;
  cta_url?: string;
  image?: StrapiMedia;
}

export interface NewsSectionData {
  id: number;
  __component: "sections.news-section";
  tagline?: string;
  heading?: string;
  cta_label?: string;
  cta_url?: string;
  articles?: ArticleCardData[];
}

export interface CtaSectionData {
  id: number;
  __component: "sections.cta-section";
  heading?: string;
  cta_label?: string;
  cta_url?: string;
  background_image?: StrapiMedia;
  logo?: StrapiMedia;
}

export type SectionData =
  | HeroSectionData
  | AboutSectionData
  | BrandsSectionData
  | IndustriesSectionData
  | FeaturesSectionData
  | ProjectsSectionData
  | NewsSectionData
  | CtaSectionData
  | { id: number; __component: string; [key: string]: unknown };

export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  shareImage?: StrapiMedia[];
}

export interface HomepageAttributes {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sections?: SectionData[];
  seo?: SeoData;
}

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}
