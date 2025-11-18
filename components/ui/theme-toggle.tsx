"use client";

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
				className="relative h-11 w-11 rounded-lg flex items-center justify-center text-xl"
				aria-label="Toggle theme"
			>
				☀️
			</button>
		);
	}

	return (
		<button
			onClick={toggleTheme}
			className="relative h-11 w-11 rounded-lg flex items-center justify-center cursor-pointer focus:outline-none focus-visible:outline-none focus:ring-0"
			aria-label={
				theme === "dark"
					? "Switch to light mode"
					: "Switch to dark mode"
			}
		>
			<span className="text-xl animate-in spin-in-180 fade-in duration-500">
				{theme === "dark" ? "☀️" : "⛅"}
			</span>
		</button>
	);
}
