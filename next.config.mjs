/** @type {import('next').NextConfig} */

const nextConfig = {
   reactStrictMode: false,
  images: {
    domains: ['images.unsplash.com','res.cloudinary.com', 'storyvord.com'], // Allow images from any domain
  },
};

export default nextConfig;
