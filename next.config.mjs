/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cms.qarigroup.com", pathname: "/**" },
      { protocol: "https", hostname: "**.qarigroup.com", pathname: "/**" },
      { protocol: "https", hostname: "secure.gravatar.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
