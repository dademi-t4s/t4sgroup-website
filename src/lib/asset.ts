/**
 * Prepend the basePath to a public-folder URL.
 * Required because Next.js (with `unoptimized: true`) doesn't prefix
 * public assets — only `_next/static` is handled by `assetPrefix`.
 *
 * Pass paths starting with `/`. Returns the same path locally (no prefix)
 * and `${basePath}/...` in production.
 */
export const asset = (path: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
