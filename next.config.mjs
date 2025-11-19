import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/cusdis-proxy/:path*',
				destination: 'https://cusdis-production-d5a0.up.railway.app/:path*',
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
							"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com blob:",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
							"font-src 'self' https://fonts.gstatic.com",
							"img-src 'self' data: https: blob:",
							"media-src 'self' blob: data:",
							"frame-src 'self' 'unsafe-inline' blob: data:",
							"child-src 'self' 'unsafe-inline' blob: data:",
							"connect-src 'self' https://vitals.vercel-insights.com https://vercel.live wss: ws:",
						].join('; '),
					},
				],
			},
		];
	},
};

const withMDX = createMDX();

export default withMDX(nextConfig);
