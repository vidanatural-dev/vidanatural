/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Listo para fotos reales: Unsplash y Wikimedia (licencias libres).
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'acdn-us.mitiendanube.com' },
      { protocol: 'https', hostname: '**.mitiendanube.com' },
    ],
  },
};

module.exports = nextConfig;
