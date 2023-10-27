/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    baseUrl: 'http://localhost:3000',
    imgApiBaseUrl: 'https://api.imgflip.com',
    notificationTTL: 5000,
  },
  webpack: (config, { isServer }) => {
    config.externals = [ ...config.externals, {
      sharp: 'commonjs sharp',
      canvas: 'commonjs canvas',
    } ]
    
      if(!isServer) {
        config.externals = [ ...config.externals, {
          bufferutil: 'bufferutil',
          'utf-8-validate': 'utf-8-validate',
          'supports-color': 'supports-color'
        } ];
      }
    return config;
  },
};

module.exports = nextConfig
