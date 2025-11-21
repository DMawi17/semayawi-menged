import Link from "next/link";
import Image from "next/image";
import { PostService } from "@/services/post.service";
import type { SortOption } from "@/lib/posts/sorting";
import { generatePageNumbers } from "@/hooks/usePagination";
import { SearchBar } from "@/components/blog/search-bar";
import { FilterBar } from "@/components/blog/filter-bar";
import { calculateReadingTime } from "@/lib/reading-time";
import { Clock } from "lucide-react";
import { CategoryBadge } from "@/components/blog/category-badge";
import { formatEthiopianDate } from "@/lib/ethiopian-date";

const POSTS_PER_PAGE = 9;

interface BlogPageProps {
	searchParams: Promise<{
		page?: string;
		q?: string;
		category?: string;
		sort?: string;
	}>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;
	const searchQuery = params.q || "";
	const categoryFilter = params.category || "all";
	const sortOption = (params.sort || "date-desc") as SortOption;

	// Fetch filtered, sorted, and paginated posts using PostService
	const {
		posts: paginatedPosts,
		totalPages,
		totalPosts,
		postCount,
	} = await PostService.getFilteredPosts({
		searchQuery,
		categoryFilter,
		sortOption,
		page: currentPage,
		itemsPerPage: POSTS_PER_PAGE,
	});

	// Helper function to build URL with current filters
	const buildPageUrl = (page: number) => {
		const urlParams = new URLSearchParams();
		urlParams.set("page", String(page));
		if (searchQuery) urlParams.set("q", searchQuery);
		if (categoryFilter && categoryFilter !== "all")
			urlParams.set("category", categoryFilter);
		if (sortOption && sortOption !== "date-desc")
			urlParams.set("sort", sortOption);
		return `/blog?${urlParams.toString()}`;
	};

	return (
		<div className="container mx-auto px-4 py-12 max-w-7xl">
			<div className="mb-12">
				<h1 className="text-4xl font-bold mb-4">መንፈሳዊ ማዕድ</h1>
				<p className="text-muted-foreground mb-6">
					ታሪክን፣ መንፈሳዊ ጥልቀትንና ምክንያታዊነትን በማጣመር ለዕለት ተዕለት ሕይወት የሚሆን መመሪያ።
				</p>
				<SearchBar />
				{searchQuery && (
					<p className="mt-4 text-sm text-muted-foreground">
						{totalPosts} ውጤት{totalPosts !== 1 ? "ዎች" : ""} ለ &ldquo;
						{searchQuery}&rdquo;
					</p>
				)}
			</div>

			{/* Filters */}
			<FilterBar postCount={postCount} />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
				{paginatedPosts.map((post) => (
					<article
						key={post.url}
						className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg [background-image:linear-gradient(to_bottom_right,rgba(237,223,214,0.3),rgba(237,223,214,0.6))] dark:[background-image:none]"
					>
						<Link href={post.url}>
							{post.data.cover && (
								<div className="relative h-48 w-full overflow-hidden">
									<Image
										src={post.data.cover}
										alt={post.data.title}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								</div>
							)}
							<div className="p-5">
								<div className="flex items-center gap-3 mb-3 flex-wrap">
									<CategoryBadge
										categoryId={post.data.category}
										showIcon={false}
										asLink={false}
									/>
									<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
										<svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
										<time dateTime={new Date(post.data.date).toISOString()}>
											{formatEthiopianDate(post.data.date)}
										</time>
									</div>
									<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
										<Clock className="h-3 w-3" />
										<span>
											{calculateReadingTime(post.rawContent || "").minutes} ደቂቃ
										</span>
									</div>
								</div>

								<h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
									{post.data.title}
								</h3>
								{post.data.description && (
									<p className="text-muted-foreground text-sm mb-3 line-clamp-3">
										{post.data.description}
									</p>
								)}
								{post.data.tags &&
									post.data.tags.length > 0 && (
										<div className="flex flex-wrap gap-2">
											{post.data.tags
												.slice(0, 3)
												.map((tag) => (
													<span
														key={tag}
														className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-white"
													>
														{tag}
													</span>
												))}
										</div>
									)}
							</div>
						</Link>
					</article>
				))}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex items-center justify-center gap-2">
					{currentPage > 1 && (
						<Link
							href={buildPageUrl(currentPage - 1)}
							className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
						>
							← የቀድሞ
						</Link>
					)}

					<div className="flex items-center gap-1">
						{generatePageNumbers(currentPage, totalPages).map(
							(page, index) => {
								if (page === "...") {
									return (
										<span
											key={`ellipsis-${index}`}
											className="inline-flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
										>
											...
										</span>
									);
								}

								return (
									<Link
										key={page}
										href={buildPageUrl(page as number)}
										className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors ${
											page === currentPage
												? "bg-primary text-primary-foreground"
												: "border bg-background hover:bg-accent hover:text-accent-foreground"
										}`}
									>
										{page}
									</Link>
								);
							}
						)}
					</div>

					{currentPage < totalPages && (
						<Link
							href={buildPageUrl(currentPage + 1)}
							className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
						>
							ቀጣይ →
						</Link>
					)}
				</div>
			)}
		</div>
	);
}
