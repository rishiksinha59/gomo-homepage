import { GlobalAttributes, HomepageAttributes, StrapiResponse } from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Get full Strapi URL from path
 */
export function getStrapiURL(path = ""): string {
  return `${STRAPI_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Get Strapi Media URL (returns relative path for Next.js image optimization & rewrites)
 */
export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) {
    return url;
  }
  return url.startsWith("/") ? url : `/${url}`;
}

/**
 * Generic Helper to fetch data from Strapi API
 */
export async function fetchStrapi<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const mergedOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(process.env.STRAPI_API_TOKEN
        ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
        : {}),
    },
    next: { revalidate: 60 }, // Default revalidation strategy for ISR
    ...options,
  };

  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error(`Strapi API Error [${response.status}]: ${response.statusText} for URL ${requestUrl}`);
    throw new Error(`Failed to fetch data from Strapi: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Fetch Global Single Type data with deep populate for Navbar & Footer
 */
export async function getGlobalData(): Promise<GlobalAttributes | null> {
  try {
    const query = [
      "populate[navbar][populate]=*",
      "populate[footer][populate][columns][populate]=links",
      "populate[footer][populate][social_links]=*",
      "populate[footer][populate][certification_logos]=true",
      "populate[footer][populate][CopyRightText]=true",
    ].join("&");

    const response = await fetchStrapi<StrapiResponse<GlobalAttributes>>(`/api/global?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching global Strapi data:", error);
    return null;
  }
}

/**
 * Fetch Homepage Single Type data with dynamic zone sections populated
 */
export async function getHomepageData(): Promise<HomepageAttributes | null> {
  try {
    const query = "populate[sections][populate]=*";
    const response = await fetchStrapi<StrapiResponse<HomepageAttributes>>(`/api/homepage?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching homepage Strapi data:", error);
    return null;
  }
}
