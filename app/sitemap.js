import { site } from "@/lib/site";
import { getPostSlugs } from "@/lib/wp";

// Refresh the sitemap hourly so new blog posts get listed.
export const revalidate = 3600;

// Served at /sitemap.xml
export default async function sitemap() {
  const now = new Date();
  const slugs = await getPostSlugs();

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...slugs.map((slug) => ({
      url: `${site.url}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
