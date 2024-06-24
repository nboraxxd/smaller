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
    ],
  },
}

export default nextConfig
