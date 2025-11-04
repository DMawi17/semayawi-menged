import { siteConfig } from "@/config/site";

// Type definitions for JSON-LD schemas
type JsonLd = {
	"@context": string;
	"@type": string;
	[key: string]: unknown;
};

// Article Schema for blog posts
export function ArticleJsonLd({
	title,
	description,
	datePublished,
	dateModified,
	authorName,
	authorUrl,
	images,
	url,
	keywords,
}: {
	title: string;
	description: string;
	datePublished: string;
	dateModified?: string;
	authorName: string;
	authorUrl?: string;
	images: string[];
	url: string;
	keywords?: string[];
}) {
	const jsonLd: JsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: title,
		description: description,
		image: images,
		datePublished: datePublished,
		dateModified: dateModified || datePublished,
		author: {
			"@type": "Person",
			name: authorName,
			url: authorUrl || siteConfig.url,
		},
		publisher: {
			"@type": "Organization",
			name: siteConfig.name,
			logo: {
				"@type": "ImageObject",
				url: `${siteConfig.url}/logo.png`,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url,
		},
	};

	if (keywords && keywords.length > 0) {
		jsonLd.keywords = keywords.join(", ");
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}

// BreadcrumbList Schema for navigation
export function BreadcrumbJsonLd({
	items,
}: {
	items: { name: string; url: string }[];
}) {
	const jsonLd: JsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}

// Person Schema for author profiles
export function PersonJsonLd({
	name,
	url,
	image,
	description,
	sameAs,
}: {
	name: string;
	url: string;
	image?: string;
	description?: string;
	sameAs?: string[];
}) {
	const jsonLd: JsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: name,
		url: url,
	};

	if (image) jsonLd.image = image;
	if (description) jsonLd.description = description;
	if (sameAs && sameAs.length > 0) jsonLd.sameAs = sameAs;

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}

// Organization Schema for site identity
export function OrganizationJsonLd() {
	const jsonLd: JsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: siteConfig.name,
		url: siteConfig.url,
		logo: `${siteConfig.url}/logo.png`,
		description: siteConfig.description,
		sameAs: [
			siteConfig.links.twitter,
			siteConfig.links.github,
			siteConfig.links.personalSite,
		],
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}

// WebSite Schema with search action
export function WebSiteJsonLd() {
	const jsonLd: JsonLd = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteConfig.name,
		url: siteConfig.url,
		description: siteConfig.description,
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}

// Blog Schema for the blog listing page
export function BlogJsonLd() {
	const jsonLd: JsonLd = {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: `${siteConfig.name} - ብሎግ`,
		description:
			"ስለ መጽሐፍ ቅዱስ ሴቶች፣ ወንዶች፣ የቤተክርስቲያን ታሪክ እና መንፈሳዊ ትምህርት የሚያስተምሩ የብሎግ ጽሑፎች።",
		url: `${siteConfig.url}/blog`,
		inLanguage: ["am-ET", "en-US"],
		author: {
			"@type": "Person",
			name: siteConfig.author,
		},
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}
