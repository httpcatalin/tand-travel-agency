const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.unsplash.com https://*.airplane-pictures.net https://i.pravatar.cc https://*.googleapis.com https://platform-lookaside.fbsbx.com https://lh3.googleusercontent.com;
    font-src 'self';
    frame-src 'self';
    worker-src 'self' blob:;
    child-src 'self' blob:;
    connect-src 'self' https://*.googleapis.com;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        aws4: false,
        encoding: false,
        'mongodb-client-encryption': false,
        snappy: false,
        '@mongodb-js/zstd': false,
        '@aws-sdk/credential-providers': false,
        bcrypt: false,
        mongodb: false,
        crypto: false,
        stream: false,
        buffer: false,
        util: false,
        assert: false,
        path: false,
        'node-pre-gyp': false,
        '@mapbox/node-pre-gyp': false
      };

      config.resolve.alias = {
        ...config.resolve.alias,
        'mongodb-client-encryption': false,
        'bcrypt': false,
        '@mapbox/node-pre-gyp': false
      };
    }

    config.externals = [
      ...(config.externals || []),
      ({ request }, callback) => {
        if (/^(mongodb|bcrypt|@mapbox\/node-pre-gyp)$/.test(request)) {
          return callback(null, `commonjs ${request}`);
        }
        callback();
      }
    ];

    if (dev) {
      config.devtool = isServer ? 'source-map' : 'eval-source-map';
    }

    return config;
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "platform-lookaside.fbsbx.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "golob-travel-agency.vercel.app" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "www.airplane-pictures.net" },
      { protocol: "http", hostname: "localhost", port: "3000" }
    ]
  },

  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "Content-Security-Policy", value: cspHeader.replace(/\n/g, "") },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
      ]
    }];
  },

  experimental: {
    serverActions: true
  },

  serverExternalPackages: ['mongodb', 'bcrypt', '@mapbox/node-pre-gyp'],
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,

  env: {
    MONGODB_URI: process.env.MONGODB_URI
  }
};

export default nextConfig;