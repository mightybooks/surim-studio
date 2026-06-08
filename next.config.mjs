/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 정적 파일 포함, 이미지 최적화 비활성화 (엑박 방지용)
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/stnadby1",
        destination: "/edition/surimji/issue-0",
        permanent: true,
      },
      {
        source: "/standby1",
        destination: "/edition/surimji/issue-0",
        permanent: true,
      },
      {
        source: "/surimzine/issue-0",
        destination: "/edition/surimji/issue-0",
        statusCode: 301,
      },
      {
        source: "/surimzine",
        destination: "/edition/surimji",
        statusCode: 301,
      },
      {
        source: "/surimzine/:path*",
        destination: "/edition/surimji",
        statusCode: 301,
      },
      {
        source: "/shop/books/:path*",
        destination: "/edition/surimseoga",
        permanent: true,
      },
      {
        source: "/shop/goods/:path*",
        destination: "/edition/goods",
        permanent: true,
      },
      {
        source: "/shop/surimji/:path*",
        destination: "/edition/surimji",
        permanent: true,
      },
      {
        source: "/shop/testcard/:path*",
        destination: "/edition",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/edition",
        permanent: true,
      },
      {
        source: "/shop/:path*",
        destination: "/edition",
        permanent: true,
      },
      {
        source: "/editions",
        destination: "/edition",
        permanent: true,
      },
      {
        source: "/editions/:path*",
        destination: "/edition/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
