/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "**" },
      { protocol: "https", hostname: "storyvord.com", pathname: "**" },
      { protocol: "https", hostname: "content.skyscnr.com", pathname: "**" },
      { protocol: "https", hostname: "logos.skyscnr.com", pathname: "**" },
      { protocol: "https", hostname: "storyvordblob.blob.core.windows.net", pathname: "**" },
    ],
  },
};

export default nextConfig;
