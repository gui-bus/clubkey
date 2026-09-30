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
}

export default nextConfig
