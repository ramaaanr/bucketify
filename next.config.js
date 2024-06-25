module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3002',
        pathname: '/product_images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3002',
        pathname: '/store_images/**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '/**',
      },
    ],
  },
};
