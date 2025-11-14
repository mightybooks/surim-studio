/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 정적 파일 포함, 이미지 최적화 비활성화 (엑박 방지용)
    unoptimized: true,
  },
};

export default nextConfig;
