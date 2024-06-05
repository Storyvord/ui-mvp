/** @type {import('next').NextConfig} */

const nextConfig = {
   reactStrictMode: false,
  images: {
    domains: ['images.unsplash.com','res.cloudinary.com'], // Allow images from any domain
  },
};

export default nextConfig;
