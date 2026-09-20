import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /**
     * Explicit URL slug, preserved from the original Jekyll filename
     * (date-stripped, lowercased) so canonical post URLs match the legacy
     * site's slugs exactly. Falls back to a slugified title when absent.
     */
    slug: z.string().optional(),
    categories: z.array(z.string()),
    tags: z.array(z.string()).optional().default([]),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    featured: z.boolean().optional().default(false),
    featured_image: z.string().optional(),
    last_modified_at: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
