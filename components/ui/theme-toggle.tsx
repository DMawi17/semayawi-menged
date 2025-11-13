"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true); // Fixme:
	}, []);

	const toggleTheme = async (event: React.MouseEvent<HTMLButtonElement>) => {
		// Check if View Transitions API is supported
		if (
			typeof document !== "undefined" &&
			"startViewTransition" in document
		) {
			const x = event.clientX;
			const y = event.clientY;
			const endRadius = Math.hypot(
				Math.max(x, innerWidth - x),
				Math.max(y, innerHeight - y)
			);

			// Mark this as a theme transition (not page transition)
			document.documentElement.setAttribute(
				"data-transition-type",
				"theme"
			);

			const transition = (document as any).startViewTransition(
				async () => {
					setTheme(theme === "dark" ? "light" : "dark");
				}
			);

			await transition.ready;

			document.documentElement.animate(
				{
					clipPath: [
						`circle(0px at ${x}px ${y}px)`,
						`circle(${endRadius}px at ${x}px ${y}px)`,
					],
				},
				{
					duration: 400,
					easing: "ease-in",
					pseudoElement: "::view-transition-new(root)",
				}
			);

			// Clean up the attribute after animation finishes
			transition.finished.finally(() => {
				document.documentElement.removeAttribute(
					"data-transition-type"
				);
			});
		} else {
			// Fallback for browsers that don't support View Transitions
			setTheme(theme === "dark" ? "light" : "dark");
		}
	};

	if (!mounted) {
		return (
			<button
				className="relative h-11 w-11 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center"
				aria-label="Toggle theme"
			>
				<Sun className="h-5 w-5" />
			</button>
		);
	}

	return (
		<button
			onClick={toggleTheme}
			className="relative h-11 w-11 rounded-lg border dark:border-gray-800   hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group cursor-pointer"
			aria-label={
				theme === "dark"
					? "Switch to light mode"
					: "Switch to dark mode"
			}
		>
			{theme === "dark" ? (
				<Sun className="h-5 w-5 text-yellow-500 animate-in spin-in-180 fade-in duration-500" />
			) : (
				<Moon className="h-5 w-5 text-gray-700 dark:text-gray-400 animate-in spin-in-180 fade-in duration-500" />
			)}
		</button>
	);
}
