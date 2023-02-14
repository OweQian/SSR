/** @type {import('next').NextConfig} */
const path = require('path');
const semi = require('@douyinfe/semi-next').default({});
const { i18n } = require('./next-i18next.config');

const nextConfig = semi({
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    domains: ['127.0.0.1'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };
    return config;
  }
});

module.exports = nextConfig
