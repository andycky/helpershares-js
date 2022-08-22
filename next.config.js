/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.helperplace.com',
          },    
          {
            protocol: 'https',
            hostname: 'helpersharesjs.herokuapp.com',
          },    
          {
            protocol: 'https',
            hostname: 'drive.google.com',
          },    
          ],
    },
  },
}

module.exports = nextConfig
