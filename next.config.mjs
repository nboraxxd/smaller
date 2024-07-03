/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/static/**',
      },
      { protocol: 'https', hostname: 'tailwindui.com', pathname: '/img/**' },
      { protocol: 'https', hostname: 'salt.tikicdn.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com', pathname: '/v0/b/**' },
    ],
  },
  compiler: {
    removeConsole: true,
  },
}

export default nextConfig
