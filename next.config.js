/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.ceneostatic.pl', 'www.ceneo.pl'],
  },
};

module.exports = nextConfig;
