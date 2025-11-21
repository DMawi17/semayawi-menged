// This file defines custom MDX components.
import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { ReactNode } from "react";
import { slug as slugger } from "github-slugger";
import { Callout } from "@/components/mdx/callout";
import { Quote } from "@/components/mdx/quote";
import { SectionDivider } from "@/components/blog/SectionDivider";
import { BibleVerse } from "@/components/mdx/bible-verse";
import { PrayerPrompt } from "@/components/mdx/prayer-prompt";
import { NumberedList, ListItem } from "@/components/mdx/numbered-list";
import { FinalReflection } from "@/components/mdx/final-reflection";
import { RelatedVerses } from "@/components/mdx/related-verses";
import { ArticleFooter } from "@/components/mdx/article-footer";
import { ScrollToTop } from "@/components/mdx/scroll-to-top";

// Helper function to remove numbers from the beginning of text
function removeLeadingNumbers(text: string): string {
	// Remove patterns like "1. ", "1.1 ", "1.1.1 ", etc.
	return text.replace(/^[\d.]+\s+/, '');
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		// Custom heading components with anchor links
		h1: ({ children }: { children?: ReactNode }) => {
			const text = typeof children === 'string' ? children : String(children);
			const cleanText = removeLeadingNumbers(text);
			return (
				<h1 className="mt-16 mb-4 text-4xl font-bold tracking-tight text-[#575175] dark:text-purple-300">
					{cleanText}
				</h1>
			);
		},
		h2: ({ children }: { children?: ReactNode }) => {
			const text = typeof children === 'string' ? children : String(children);
			const cleanText = removeLeadingNumbers(text);
			const id = slugger(cleanText);

			return (
				<>
					<SectionDivider />
					<h2 id={id} className="mt-16 mb-4 text-3xl font-semibold tracking-tight text-[#575175] dark:text-purple-300">
						{cleanText}
					</h2>
				</>
			);
		},
		h3: ({ children }: { children?: ReactNode }) => {
			const text = typeof children === 'string' ? children : String(children);
			const cleanText = removeLeadingNumbers(text);
			const id = slugger(cleanText);
			return (
				<>
					<SectionDivider />
					<h3 id={id} className="mt-12 mb-3 text-2xl font-semibold tracking-tight text-[#575175] dark:text-purple-300">
						{cleanText}
					</h3>
				</>
			);
		},
		h4: ({ children }: { children?: ReactNode }) => {
			const text = typeof children === 'string' ? children : String(children);
			const cleanText = removeLeadingNumbers(text);
			return (
				<h4 className="mt-10 mb-2 text-xl font-semibold tracking-tight text-[#575175] dark:text-purple-300">
					{cleanText}
				</h4>
			);
		},
		h5: ({ children }: { children?: ReactNode }) => {
			const text = typeof children === 'string' ? children : String(children);
			const cleanText = removeLeadingNumbers(text);
			return (
				<h5 className="mt-8 mb-2 text-lg font-semibold tracking-tight text-[#575175] dark:text-purple-300">
					{cleanText}
				</h5>
			);
		},
		h6: ({ children }: { children?: ReactNode }) => {
			const text = typeof children === 'string' ? children : String(children);
			const cleanText = removeLeadingNumbers(text);
			return (
				<h6 className="mt-8 mb-2 text-base font-semibold tracking-tight text-[#575175] dark:text-purple-300">
					{cleanText}
				</h6>
			);
		},
		// Paragraph with proper spacing
		p: ({ children }: { children?: ReactNode }) => (
			<p className="mb-4 leading-7 text-foreground [&:not(:first-child)]:mt-6">
				{children}
			</p>
		),
		// Lists with emoji styling
		ul: ({ children }: { children?: ReactNode }) => (
			<ul className="my-6 space-y-3 text-foreground">
				{children}
			</ul>
		),
		ol: ({ children }: { children?: ReactNode }) => (
			<ol className="my-6 space-y-3 text-foreground">
				{children}
			</ol>
		),
		li: ({ children }: { children?: ReactNode }) => (
			<li className="flex items-start gap-3 leading-7">
				<span className="text-lg mt-0.5 flex-shrink-0">⭐</span>
				<span className="flex-1">{children}</span>
			</li>
		),
		// Blockquote styling
		blockquote: ({ children }: { children?: ReactNode }) => (
			<blockquote className="mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground">
				{children}
			</blockquote>
		),
		// Table styling
		table: ({ children }: { children?: ReactNode }) => (
			<div className="my-6 w-full overflow-y-auto">
				<table className="w-full border-collapse">{children}</table>
			</div>
		),
		thead: ({ children }: { children?: ReactNode }) => (
			<thead className="bg-muted">{children}</thead>
		),
		tbody: ({ children }: { children?: ReactNode }) => (
			<tbody>{children}</tbody>
		),
		tr: ({ children }: { children?: ReactNode }) => (
			<tr className="m-0 border-t border-border p-0 even:bg-muted/50">
				{children}
			</tr>
		),
		th: ({ children }: { children?: ReactNode }) => (
			<th className="border border-border px-4 py-2 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right">
				{children}
			</th>
		),
		td: ({ children }: { children?: ReactNode }) => (
			<td className="border border-border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
				{children}
			</td>
		),
		// Code blocks
		pre: ({ children }: { children?: ReactNode }) => (
			<pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted p-4">
				{children}
			</pre>
		),
		code: ({ children }: { children?: ReactNode }) => (
			<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
				{children}
			</code>
		),
		// Links
		a: ({ children, href }: { children?: ReactNode; href?: string }) => (
			<a
				href={href}
				className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
				target={href?.startsWith("http") ? "_blank" : undefined}
				rel={
					href?.startsWith("http") ? "noopener noreferrer" : undefined
				}
			>
				{children}
			</a>
		),
		// Image with Next.js Image component
		img: (props: ImageProps & { alt?: string }) => (
			<Image
				{...props}
				alt={props.alt || ""}
				width={800}
				height={600}
				className="rounded-lg my-6"
			/>
		),
		// Horizontal rule
		hr: () => <hr className="my-8 border-border" />,
		// Strong and emphasis
		strong: ({ children }: { children?: ReactNode }) => (
			<strong className="font-semibold">{children}</strong>
		),
		em: ({ children }: { children?: ReactNode }) => (
			<em className="italic">{children}</em>
		),
		// Custom components
		Callout,
		Quote,
		BibleVerse,
		PrayerPrompt,
		NumberedList,
		ListItem,
		FinalReflection,
		RelatedVerses,
		ArticleFooter,
		ScrollToTop,
		...components,
	};
}
