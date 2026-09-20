import type { CollectionEntry } from "astro:content";

/** Slugify a title: lowercase, strip punctuation, spaces/underscores -> hyphens. */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics
    .replace(/['’"]/g, "") // drop apostrophes/quotes entirely
    .replace(/[^a-z0-9]+/g, "-") // everything else -> hyphen
    .replace(/^-+|-+$/g, "") // trim leading/trailing hyphens
    .replace(/-+/g, "-"); // collapse repeats
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Canonical URL for a post: /<categories.../<yyyy>/<mm>/<dd>/<slug>/
 * Categories are lowercased and joined as nested path segments, in the
 * order given in frontmatter. Date components come from the frontmatter
 * `date` field (UTC), not the source filename.
 */
export function postUrl(post: CollectionEntry<"blog">): string {
  const { categories, date, title, slug: explicitSlug } = post.data;
  const categoryPath = categories.map((c) => c.toLowerCase()).join("/");
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const slug = explicitSlug ?? slugify(title);
  return `/${categoryPath}/${year}/${month}/${day}/${slug}/`;
}

/** Same as postUrl but without leading/trailing slashes, for getStaticPaths params. */
export function postSlugPath(post: CollectionEntry<"blog">): string {
  return postUrl(post).replace(/^\/|\/$/g, "");
}
