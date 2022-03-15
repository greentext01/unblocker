const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  env: {
    GOOGLE_CLIENT_ID:
      '645889149447-0ouqtjhrg9mpnp2amjrb05ievs255dn1.apps.googleusercontent.com',
  },
});
