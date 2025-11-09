import { blog } from "@/.source";
import fs from "fs";
import path from "path";

/**
 * Get raw MDX content from a blog post file
 * @param fullPath - Full path to the MDX file
 * @returns The raw file content without frontmatter
 */
function getRawContent(fullPath: string): string {
	try {
		const fileContent = fs.readFileSync(fullPath, "utf-8");
		// Remove frontmatter (everything between --- markers)
		const contentWithoutFrontmatter = fileContent.replace(/^---[\s\S]*?---\n/, "");
		return contentWithoutFrontmatter;
	} catch (error) {
		console.error(`Error reading file: ${fullPath}`, error);
		return "";
	}
}

export const source = {
	getPages: async () => {
		return blog.map((page) => {
			const slug = page.info.path.replace(/\.mdx?$/, "");
			const rawContent = getRawContent(page.info.fullPath);
			return {
				...page,
				url: `/blog/${slug}`,
				rawContent, // Add raw content for reading time calculation
				data: {
					title: page.title,
					description: page.description,
					date: page.date,
					cover: page.cover,
					published: page.published,
					tags: page.tags,
					category: page.category,
					featured: page.featured,
					author: page.author,
					audio: page.audio,
				},
			};
		});
	},
	getPage: async (slugs: string[]) => {
		const requestedSlug = slugs.join("/");
		const page = blog.find((p) => {
			const slug = p.info.path.replace(/\.mdx?$/, "");
			return slug === requestedSlug;
		});
		if (!page) return undefined;

		const slug = page.info.path.replace(/\.mdx?$/, "");
		const rawContent = getRawContent(page.info.fullPath);
		return {
			...page,
			url: `/blog/${slug}`,
			rawContent, // Add raw content for reading time calculation
			data: {
				title: page.title,
				description: page.description,
				date: page.date,
				cover: page.cover,
				published: page.published,
				tags: page.tags,
				category: page.category,
				featured: page.featured,
				author: page.author,
				audio: page.audio,
			},
		};
	},
};
