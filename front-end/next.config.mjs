/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['*', 'firebasestorage.googleapis.com'], // Allow loading images from all domains
  },
};

export default nextConfig;
