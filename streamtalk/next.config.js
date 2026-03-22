/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next.js 15 - opt into default caching for fetch requests
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  // Configure for Socket.IO
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Next 16 requires turbopack parameter when using custom webpack config
  turbopack: {},
  async rewrites() {
    return [
      {
        source: '/3d-avatar',
        destination: '/avatar/index.html',
      },
      {
        source: '/3d-avatar/:path*',
        destination: '/avatar/:path*',
      },
      // Ensure absolute path requests from the Angular app (like /assets/...) reach the right folder
      {
        source: '/assets/:path*',
        destination: '/avatar/assets/:path*',
      },
      // Handle standard Angular script names that might be requested from the root
      {
        source: '/:file(main|polyfills|runtime|styles|worker|holistic|three.module|dom|keyboard|ios.transition|md.transition|swipe-back|focus-visible|esm-.*|chunk-.*|dist-.*|index7-.*|index3-.*|status-tap|input-shims|blob_writer-.*|fsw-.*|sgnw-.*|translate.component-.*|loader-.*|ion-icon.entry-.*|model-viewer-.*|pose-viewer.entry-.*|playground.component-.*|benchmark.component-.*|map.component-.*|landing.routes-.*|settings.routes-.*|web-.*|text_bundle-.*|ngsw-worker|safety-worker|worker-basic.min|app-.*).:ext(js|css|json|map|svg|png|jpg|jpeg|gif|woff|woff2|ttf|eot)',
        destination: '/avatar/:file.:ext',
      }
    ];
  },
};

module.exports = nextConfig;
