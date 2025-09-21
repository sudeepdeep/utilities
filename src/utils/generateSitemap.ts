/* eslint-disable @typescript-eslint/no-explicit-any */
import { categories, tools } from "../data/tools";

export function generateSitemapXML() {
  const baseUrl = "https://codeinstock.com";
  const currentDate = new Date().toISOString().split("T")[0];

  const staticPages = [
    { url: "", priority: "1.0", changefreq: "daily" },
    { url: "/about", priority: "0.8", changefreq: "monthly" },
    { url: "/contact", priority: "0.7", changefreq: "monthly" },
  ];

  const toolPages = tools.map((tool: any) => ({
    url: `/utilities/category/${tool.category}/tools/${tool.id}`,
    priority: "0.9",
    changefreq: "weekly",
  }));

  const categoryPages = Object.keys(categories).map((category: any) => ({
    url: `/category/${category}`,
    priority: "0.7",
    changefreq: "weekly",
  }));

  const allPages = [...staticPages, ...toolPages, ...categoryPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return sitemap;
}

// Generate and download sitemap
export function downloadSitemap() {
  const sitemap = generateSitemapXML();
  const blob = new Blob([sitemap], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sitemap.xml";
  a.click();
}
