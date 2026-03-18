/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.next/**',
          '**/swapfile.sys',
          '**/pagefile.sys',
          '**/hiberfil.sys',
          '**/System Volume Information/**',
        ],
      }
    }
    return config
  },
}

export default nextConfig
