/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { SeoPageData } from "../types";
import { JsonLdSchema } from "./JsonLdSchema";
import siteConfig from "../config/siteConfig";

interface SEOHeadProps {
  seoData: SeoPageData;
}

export function SEOHead({ seoData }: SEOHeadProps) {
  useEffect(() => {
    // 1. Update document title
    document.title = seoData.pageTitle || seoData.metaTitle;

    // Helper to find or create a meta tag
    const updateOrCreateMeta = (nameAttr: "name" | "property", val: string, content: string) => {
      if (!content) return;
      let el = document.querySelector(`meta[${nameAttr}="${val}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(nameAttr, val);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Set description
    updateOrCreateMeta("name", "description", seoData.metaDescription);

    // 3. Set canonical URL link
    if (seoData.canonicalUrl) {
      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", seoData.canonicalUrl);
    }

    // Determine absolute social card image dynamically based on region configuration
    const getAbsoluteSocialImage = (fallbackImg?: string) => {
      if (siteConfig.ogImagePath) {
        if (siteConfig.ogImagePath.startsWith("http")) {
          return siteConfig.ogImagePath;
        }
        const baseDomain = siteConfig.regionSlug === "kent"
          ? "https://bestukbroadband.github.io"
          : "https://www.wiltshirebroadbandfinder.co.uk";
        return `${baseDomain}${siteConfig.ogImagePath}`;
      }
      return fallbackImg || "";
    };

    const resolvedSocialImage = getAbsoluteSocialImage(seoData.ogImage);

    // 4. Open Graph (OG)
    updateOrCreateMeta("property", "og:title", seoData.ogTitle || seoData.pageTitle);
    updateOrCreateMeta("property", "og:description", seoData.ogDescription || seoData.metaDescription);
    updateOrCreateMeta("property", "og:image", resolvedSocialImage);
    updateOrCreateMeta("property", "og:url", seoData.canonicalUrl);
    updateOrCreateMeta("property", "og:type", "website");

    // 5. Twitter Meta Tags
    updateOrCreateMeta("name", "twitter:card", "summary_large_image");
    updateOrCreateMeta("name", "twitter:title", seoData.twitterTitle || seoData.ogTitle);
    updateOrCreateMeta("name", "twitter:description", seoData.twitterDescription || seoData.ogDescription);
    updateOrCreateMeta("name", "twitter:image", resolvedSocialImage);

    // 6. Keywords
    if (seoData.primaryKeyword) {
      const keywords = [seoData.primaryKeyword, ...(seoData.secondaryKeywords || [])].join(", ");
      updateOrCreateMeta("name", "keywords", keywords);
    }

    // 7. Robots (index/noindex)
    const robotsVal = seoData.indexStatus === "noindex" ? "noindex, follow" : "index, follow";
    updateOrCreateMeta("name", "robots", robotsVal);

    // 8. Dynamic Favicon & Touch Icon Resolver for Wiltshire vs Kent and Subfolders
    const resolveDynamicPath = (path: string) => {
      if (!path) return "";
      if (path.startsWith("http") || !path.startsWith("/")) return path;
      if (typeof window !== "undefined") {
        const basePath = siteConfig.githubPagesBasePath || "";
        const isSubdirActive = basePath && window.location.pathname.startsWith(basePath);
        if (isSubdirActive) {
          const cleanBase = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
          return `${cleanBase}${path}`;
        }
      }
      return path;
    };

    if (siteConfig.faviconPath) {
      const iconUrl = resolveDynamicPath(siteConfig.faviconPath);
      let iconEl = document.querySelector('link[rel="icon"]');
      if (!iconEl) {
        iconEl = document.createElement("link");
        iconEl.setAttribute("rel", "icon");
        document.head.appendChild(iconEl);
      }
      if (iconUrl.endsWith(".svg")) {
        iconEl.setAttribute("type", "image/svg+xml");
      } else {
        iconEl.setAttribute("type", "image/png");
      }
      iconEl.setAttribute("href", iconUrl);
    }

    if (siteConfig.appIconPath) {
      const appleIconUrl = resolveDynamicPath(siteConfig.appIconPath);
      let appleIconEl = document.querySelector('link[rel="apple-touch-icon"]');
      if (!appleIconEl) {
        appleIconEl = document.createElement("link");
        appleIconEl.setAttribute("rel", "apple-touch-icon");
        document.head.appendChild(appleIconEl);
      }
      appleIconEl.setAttribute("href", appleIconUrl);
    }
  }, [seoData]);

  // Handle rich JSON-LD parsing safely
  let parsedSchema: object | null = null;
  try {
    if (seoData.schemaJson) {
      parsedSchema = typeof seoData.schemaJson === "string" 
        ? JSON.parse(seoData.schemaJson)
        : seoData.schemaJson;
    }
  } catch (error) {
    console.error("Failed to parse scheme JSON for:", seoData.slug, error);
  }

  return (
    <>
      {parsedSchema && (
        <JsonLdSchema schema={parsedSchema} id={`seo-page-${seoData.slug || "home"}`} />
      )}
    </>
  );
}

export default SEOHead;
