/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://mobile.inicis.com",
  "script-src 'self' 'unsafe-inline'" + (isDevelopment ? " 'unsafe-eval'" : "") + " https://cdn.portone.io https://developers.kakao.com https://t1.kakaocdn.net https://t1.daumcdn.net https://cloud.umami.is https://*.paypal.com https://*.paypalobjects.com https://*.venmo.com",
  "style-src 'self' 'unsafe-inline' https://*.paypal.com https://*.paypalobjects.com https://*.venmo.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.portone.io https://checkout-service.prod.iamport.co https://*.paypal.com https://*.paypalobjects.com https://*.venmo.com https://cloud.umami.is https://gateway.umami.is",
  "frame-src 'self' https://*.portone.io https://checkout-service.prod.iamport.co https://*.inicis.com https://*.paypal.com https://*.paypalobjects.com https://*.venmo.com https://postcode.map.kakao.com https://postcode.map.daum.net https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com",
  "child-src 'self' https://*.paypal.com https://*.paypalobjects.com https://*.venmo.com",
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(self)" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    // 정적 파일 포함, 이미지 최적화 비활성화 (엑박 방지용)
    unoptimized: true,
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
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
