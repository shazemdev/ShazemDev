/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emits a plain static site to out/, which Cloudflare Pages serves directly.
  // There is no Node server in production — avoid features that need one
  // (route handlers, ISR, middleware, server actions).
  output: 'export',

  // next/image's optimizer needs a server, so it must be off for static export.
  // Screenshots on future app pages will be served as-is.
  images: { unoptimized: true },
};

export default nextConfig;
