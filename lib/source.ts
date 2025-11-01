import { blog } from "@/.source";

export const source = {
	getPages: async () => {
		return blog.map((page) => {
			const slug = page.info.path.replace(/\.mdx?$/, "");
			return {
				...page,
				url: `/blog/${slug}`,
				data: {
					title: page.title,
					description: page.description,
					date: page.date,
					cover: page.cover,
					published: page.published,
					tags: page.tags,
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
		return {
			...page,
			url: `/blog/${slug}`,
			data: {
				title: page.title,
				description: page.description,
				date: page.date,
				cover: page.cover,
				published: page.published,
				tags: page.tags,
			},
		};
	},
};
