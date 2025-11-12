import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/account/"] },
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ChatGPT-User", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "FacebookBot", disallow: "/" },
    ],
    sitemap: "https://surimstudio.com/sitemap.xml",
  };
}
