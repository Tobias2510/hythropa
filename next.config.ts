import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["192.168.*.*"], // only for testing on mobile
};

export default nextConfig;
