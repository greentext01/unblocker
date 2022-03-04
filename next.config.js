const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  env: {
    GOOGLE_CLIENT_ID:
      '645889149447-0ouqtjhrg9mpnp2amjrb05ievs255dn1.apps.googleusercontent.com',
  },
});
