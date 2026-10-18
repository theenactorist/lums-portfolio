/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  // Handle the retired About URL before normal trailing-slash normalization.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/about/', destination: '/#about', permanent: true },
      // Preserve Next's existing slash-removal behavior for every other path.
      { source: '/:path+/', destination: '/:path+', permanent: true },
    ];
  },
  async headers() {
    return [
      // Interactive demos and the print view remain usable, while the actual
      // portfolio pages are the versions intended for search results.
      ...[
        '/work/stablecoin-checkout-sdk/:path*',
        '/work/pulse/sdk-preview/:path*',
        '/work/shiga-onboarding/demo-2026-09/:path*',
        '/work/shiga-onboarding/prototype-v2/:path*',
        '/olumide-olusesi-resume.html',
      ].map((source) => ({ source, headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }] })),
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
