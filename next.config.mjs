import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
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
							"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cusdis-proxy-production.up.railway.app https://vercel.live https://va.vercel-scripts.com",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cusdis-proxy-production.up.railway.app",
							"font-src 'self' https://fonts.gstatic.com",
							"img-src 'self' data: https: blob:",
							"media-src 'self' blob: data:",
							"frame-src https://cusdis-proxy-production.up.railway.app",
							"connect-src 'self' https://vitals.vercel-insights.com https://vercel.live https://cusdis-proxy-production.up.railway.app",
						].join('; '),
					},
				],
			},
		];
	},
};

const withMDX = createMDX();

export default withMDX(nextConfig);
