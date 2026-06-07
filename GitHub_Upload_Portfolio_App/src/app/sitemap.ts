import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";
import { slugify } from "@/lib/utils";
import { getPublishedWork } from "@/lib/work";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/work",
    "/blog",
    "/contact",
    "/privacy",
    "/resources/icp-checklist",
    "/workshop",
  ].map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path === "/resources/icp-checklist" ? 0.85 : 0.7,
    }));

  let postRoutes: MetadataRoute.Sitemap = [];
  let categoryRoutes: MetadataRoute.Sitemap = [];
  let serviceRoutes: MetadataRoute.Sitemap = [];
  let workRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, category: true, updatedAt: true },
    });
    postRoutes = posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
    const categories = Array.from(new Set(posts.map((p) => p.category)));
    categoryRoutes = categories.map((category) => ({
      url: `${base}/blog/category/${slugify(category)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.55,
    }));
  } catch {
    postRoutes = [];
    categoryRoutes = [];
  }
  try {
    const works = await getPublishedWork();
    workRoutes = works.map((work) => ({
      url: `${base}/work/${work.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    workRoutes = [];
  }
  try {
    const services = await prisma.service.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    serviceRoutes = services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    serviceRoutes = [];
  }

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...workRoutes,
    ...categoryRoutes,
    ...postRoutes,
  ];
}
