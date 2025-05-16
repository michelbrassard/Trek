import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    connect-src 'self' http://localhost:8000 http://localhost:8001;`

const nextConfig: NextConfig = {
  poweredByHeader: false,
  
  async headers() {
    return [
      {
        source: "/(.*)", // Apply CSP to all routes
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // Prevents iframe embedding
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block", // Enable XSS protection
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",  // Disables MIME sniffing
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload", // HSTS header
          },
        ],
      },
    ];
  },
};

export default nextConfig;
