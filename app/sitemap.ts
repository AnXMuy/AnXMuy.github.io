import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://anxmuy.github.io";
  const paths = ["", "/publications/", "/competitions/", "/honors-awards/", "/blog/", ...blogPosts.filter((post) => !post.external).map((post) => post.href)];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.7,
  }));
}
