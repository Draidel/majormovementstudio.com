/**
 * Generic utilities used by every content query.
 *
 * Kept dependency-free so that swapping out the CMS would only require
 * rewriting `reader.ts` and `queries.ts` — not these helpers.
 */

/**
 * Stable, immutable sort by a numeric `order` field, ascending.
 *
 * Items missing an order land at the end (POSITIVE_INFINITY) on purpose:
 * a freshly-added entry without an explicit order shouldn't accidentally
 * leap to the top of the page just because the editor forgot the field.
 */
export function byOrder<T extends { order?: number | null }>(items: readonly T[]): T[] {
  return [...items].sort(
    (a, b) => (a.order ?? Number.POSITIVE_INFINITY) - (b.order ?? Number.POSITIVE_INFINITY),
  );
}

/**
 * Flatten Keystatic's `{ slug, entry }` listing into a single merged
 * object. Most consumers want the slug alongside the fields, not nested.
 */
export function flatten<T extends Record<string, unknown>>(
  entries: readonly { slug: string; entry: T }[],
): Array<T & { slug: string }> {
  return entries.map(({ slug, entry }) => ({ slug, ...entry }));
}

/**
 * Read a singleton or fail with a helpful message.
 *
 * Singletons are required by definition — when the file is missing, the
 * site can't render. We throw at build time rather than letting the
 * component crash with a generic null-dereference; the message points
 * the editor at the correct fix.
 */
export async function readRequiredSingleton<T>(
  read: () => Promise<T | null>,
  name: string,
): Promise<T> {
  const value = await read();
  if (!value) {
    throw new Error(
      `[content] Singleton "${name}" was not found in /content. ` +
        `Recreate it through the admin UI at /keystatic, or check that ` +
        `content/${name}/index.yaml still exists.`,
    );
  }
  return value;
}
