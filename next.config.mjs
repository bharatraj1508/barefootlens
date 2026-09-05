/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a self-contained server bundle for a small Docker image.
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
