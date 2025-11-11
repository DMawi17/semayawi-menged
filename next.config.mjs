import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/cusdis-proxy/:path*',
				destination: 'http://localhost:3001/:path*',
			},
		];
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
					{
						key: 'Content-Security-Policy',
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3000 https://vercel.live https://va.vercel-scripts.com",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com http://localhost:3000",
							"font-src 'self' https://fonts.gstatic.com",
							"img-src 'self' data: https: blob:",
							"media-src 'self' blob: data:",
							"frame-src http://localhost:3000",
							"connect-src 'self' https://vitals.vercel-insights.com https://vercel.live http://localhost:3000",
						].join('; '),
					},
				],
			},
		];
	},
};

const withMDX = createMDX();

export default withMDX(nextConfig);
