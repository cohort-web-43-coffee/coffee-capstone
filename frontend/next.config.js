/** @type {import('next').NextConfig} */


const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/apis/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: process.env.REST_API_URL }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Cookie, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: '/apis/:path*',
                destination: `${process.env.REST_API_URL}/apis/:path*`
                // Proxy to Backend
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.yelpcdn.com',
                port: '',
                pathname: '/bphoto/*/o.jpg',
            },
        ],
    },
}


module.exports = nextConfig