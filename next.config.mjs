/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  // Static HTML export so the site can be served by GitHub Pages.
  output: 'export',
  reactStrictMode: true,
  // GitHub Pages serves the project at /<repo-name>/ — basePath rewrites
  // every URL accordingly. Locally we leave it empty so dev still works.
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    // next/image runtime optimisation isn't available on a static host;
    // skipping it lets <Image> render as a plain <img>.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  experimental: { optimizePackageImports: ['framer-motion', 'gsap'] },
};

export default nextConfig;
