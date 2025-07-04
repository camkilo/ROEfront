/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: false, // ✅ keep if using styled-components (optional)
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ✅ allows images from any domain
      },
    ],
  },
};

module.exports = nextConfig;
