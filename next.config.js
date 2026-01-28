/** @type {import('next').NextConfig} */
const nextConfig = {
    // Cho phép external images từ YouTube thumbnails
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
        ],
    },
};

module.exports = nextConfig;
