/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Swarm',
  assetPrefix: '/Swarm',
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
