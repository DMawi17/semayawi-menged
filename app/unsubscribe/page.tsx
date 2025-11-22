"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function UnsubscribeContent() {
	const searchParams = useSearchParams();
	const email = searchParams.get("email");
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [message, setMessage] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleUnsubscribe = async () => {
		if (!email) {
			setStatus("error");
			setMessage("የኢሜይል አድራሻ አልተገኘም።");
			return;
		}

		setStatus("loading");
		setMessage("");
		setIsDialogOpen(false);

		try {
			const response = await fetch("/api/unsubscribe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const data = await response.json();

			if (response.ok) {
				setStatus("success");
				setMessage(data.message || "በተሳካ ሁኔታ ከዝርዝሩ ተወግደዋል።");
			} else {
				setStatus("error");
				setMessage(data.error || "የሆነ ችግር ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።");
			}
		} catch (error) {
			setStatus("error");
			setMessage("የተጠበቀ ስህተት አጋጥሟል። እባክዎ እንደገና ይሞክሩ።");
		}
	};

	return (
		<div className="container mx-auto px-4 py-16 max-w-2xl">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-6">
					የደብዳቤ ዝርዝር አባልነትን መሰረዝ
				</h1>

				{!email ? (
					<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
						<p className="text-red-600 dark:text-red-400">
							የኢሜይል አድራሻ አልተገኘም። እባክዎ ከኢሜልዎ ላይ ያለውን ሊንክ ይጠቀሙ።
						</p>
					</div>
				) : status === "success" ? (
					<div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 mb-6">
						<div className="text-6xl mb-4">✓</div>
						<h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-3">
							{message}
						</h2>
						<p className="text-muted-foreground mb-6">
							ከዚህ በኋላ ከ{" "}
							<strong className="text-foreground">
								ሰማያዊ መንገድ
							</strong>{" "}
							ኢሜይሎችን አይቀበሉም።
						</p>
						<p className="text-sm text-muted-foreground mb-6">
							ከፈለጉ በማንኛውም ጊዜ እንደገና መመዝገብ ይችላሉ።
						</p>
						<Link
							href="/"
							className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
						>
							ወደ ዋና ገጽ ይመለሱ
						</Link>
					</div>
				) : (
					<>
						<div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-8 mb-6">
							<p className="text-lg mb-4">
								ከደብዳቤ ዝርዝራችን መውጣት ይፈልጋሉ?
							</p>
							<p className="text-muted-foreground mb-2">ኢሜል፦</p>
							<p className="font-semibold text-lg mb-6">
								{email}
							</p>

							{message && status === "error" && (
								<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
									<p className="text-red-600 dark:text-red-400 text-sm">
										{message}
									</p>
								</div>
							)}

							<AlertDialog
								open={isDialogOpen}
								onOpenChange={setIsDialogOpen}
							>
								<AlertDialogTrigger asChild>
									<button
										disabled={status === "loading"}
										className="inline-flex h-11 items-center justify-center rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4 cursor-pointer px-8 text-sm font-medium"
									>
										{status === "loading"
											? "በመሰረዝ ላይ..."
											: "አባልነትዎን ይሰርዙ"}
									</button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											አባልነትዎ ይሰረዝ?
										</AlertDialogTitle>
										<AlertDialogDescription>
											ከዚህ በኋላ ከሰማያዊ መንገድ ኢሜሎችን አይቀበሉም።
											ከፈለጉ በማንኛውም ጊዜ እንደገና መመዝገብ ይችላሉ።
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel className="cursor-pointer">
											አቋርጥ
										</AlertDialogCancel>
										<AlertDialogAction
											onClick={handleUnsubscribe}
											className="bg-destructive text-white hover:bg-destructive/90 cursor-pointer dark:bg-destructive dark:text-white"
										>
											ሰርዝ
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>

							<p className="text-sm text-muted-foreground">
								ወይም{" "}
								<Link
									href="/"
									className="text-primary hover:underline font-medium"
								>
									ወደ ዋና ገጽ ይመለሱ
								</Link>
							</p>
						</div>

						<div className="text-sm text-muted-foreground">
							<p>
								ችግር ካለ እባክዎ{" "}
								<a
									href={`mailto:${
										process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
										"contact@semayawi.blog"
									}`}
									className="text-primary hover:underline"
								>
									ያግኙን
								</a>
								።
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default function UnsubscribePage() {
	return (
		<Suspense fallback={
			<div className="container mx-auto px-4 py-16 max-w-2xl">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-6">
						የደብዳቤ ዝርዝር አባልነትን መሰረዝ
					</h1>
					<p className="text-muted-foreground">በመጫን ላይ...</p>
				</div>
			</div>
		}>
			<UnsubscribeContent />
		</Suspense>
	);
}
