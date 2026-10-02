/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: [
    "@clubkey/ui",
    "@clubkey/types",
    "@clubkey/schemas",
    "@clubkey/utils",
  ],
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "d2m6h3qnuwjcmy.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "sra.stays.com.br",
      },
      {
        protocol: "https",
        hostname: "credlab.stays.net",
      },
    ],
  },
}

export default nextConfig
