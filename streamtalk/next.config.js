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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self';",
          },
          // Allow cross-origin requests for wasm and data files
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, OPTIONS',
          }
        ],
      },
      {
        source: '/avatar/assets/models/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'application/octet-stream',
          }
        ]
      }
    ];
  },
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
      // Fix for missing language detector model - redirect to CDN if local fetch fails
      {
        source: '/avatar/assets/models/mediapipe-language-detector/model.tflite',
        destination: 'https://storage.googleapis.com/mediapipe-tasks/language_detector/language_detector.tflite',
      },
      {
        source: '/avatar/assets/models/mediapipe-language-detector/:file.wasm',
        destination: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@latest/wasm/:file.wasm',
      },
      // Fix for holistic/mediapipe model naming convention
      {
        source: '/avatar/assets/models_ctor/:path*',
        destination: '/avatar/assets/models/holistic/:path*',
      },
      // Ensure absolute path requests from the Angular app reach the right folder
      {
        source: '/avatar/assets/:path*',
        destination: '/avatar/assets/:path*',
      },
      // IMPORTANT: Explicitly handle .tflite, .data, and .binarypb files which are failing
      {
        source: '/avatar/assets/models/:path*',
        destination: '/avatar/assets/models/:path*',
      },
      {
        source: '/assets/:path*',
        destination: '/avatar/assets/:path*',
      },
      // Handle standard Angular script and model names that might be requested from the root
      {
        source: '/:file(main|polyfills|runtime|styles|worker|holistic|three.module|dom|keyboard|ios.transition|md.transition|swipe-back|focus-visible|esm-.*|chunk-.*|dist-.*|index7-.*|index3-.*|status-tap|input-shims|blob_writer-.*|fsw-.*|sgnw-.*|translate.component-.*|loader-.*|ion-icon.entry-.*|model-viewer-.*|pose-viewer.entry-.*|playground.component-.*|benchmark.component-.*|map.component-.*|landing.routes-.*|settings.routes-.*|web-.*|text_bundle-.*|ngsw-worker|safety-worker|worker-basic.min|app-.*).:ext(js|css|json|map|svg|png|jpg|jpeg|gif|woff|woff2|ttf|eot|wasm|tflite|bin|data|binarypb)',
        destination: '/avatar/:file.:ext',
      }
    ];
  },
};

module.exports = nextConfig;
