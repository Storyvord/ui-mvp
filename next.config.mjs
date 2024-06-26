/** @type {import('next').NextConfig} */

const nextConfig = {
   reactStrictMode: false,
  images: {
    domains: ['images.unsplash.com','res.cloudinary.com', 'storyvord.com', 'content.skyscnr.com', 'logos.skyscnr.com'], // Allow images from any domain
  },
};

export default nextConfig;
