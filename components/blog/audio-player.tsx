"use client";

import { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
	audioUrl: string;
	title?: string;
}

export function AudioPlayer({ audioUrl, title }: AudioPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(10); // 0-10 scale
	const [playbackRate, setPlaybackRate] = useState(1);
	const [showVolumeSlider, setShowVolumeSlider] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const handleEnded = () => setIsPlaying(false);
		const handleError = () => {
			setError("Failed to load audio");
			setIsPlaying(false);
		};
		const handleTimeUpdate = () => {
			if (audio) setCurrentTime(audio.currentTime);
		};
		const handleLoadedMetadata = () => {
			if (audio) setDuration(audio.duration);
		};

		// Add event listeners
		audio.addEventListener("ended", handleEnded);
		audio.addEventListener("error", handleError);
		audio.addEventListener("timeupdate", handleTimeUpdate);
		audio.addEventListener("loadedmetadata", handleLoadedMetadata);

		// Defensive check for cached audio
		if (audio.readyState > 0) {
			handleLoadedMetadata();
		}

		// Cleanup
		return () => {
			audio.removeEventListener("ended", handleEnded);
			audio.removeEventListener("error", handleError);
			audio.removeEventListener("timeupdate", handleTimeUpdate);
			audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
		};
	}, []);

	const togglePlayPause = async () => {
		const audio = audioRef.current;
		if (!audio) return;

		try {
			if (isPlaying) {
				audio.pause();
				setIsPlaying(false);
			} else {
				await audio.play();
				setIsPlaying(true);
				setError(null);
			}
		} catch (err) {
			console.error("Audio playback error:", err);
			setError("Failed to play audio");
			setIsPlaying(false);
		}
	};

	const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const audio = audioRef.current;
		if (!audio) return;
		const newTime = parseFloat(e.target.value);
		audio.currentTime = newTime;
		setCurrentTime(newTime);
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const audio = audioRef.current;
		if (!audio) return;
		const volumeValue = parseFloat(e.target.value);
		const normalizedVolume = volumeValue / 10; // Convert 0-10 to 0-1
		audio.volume = normalizedVolume;
		setVolume(volumeValue);
	};

	const skip = (seconds: number) => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.currentTime = Math.max(
			0,
			Math.min(audio.duration, audio.currentTime + seconds)
		);
	};

	const cyclePlaybackSpeed = () => {
		const audio = audioRef.current;
		if (!audio) return;
		const speeds = [1, 1.25, 1.5, 1.75, 2];
		const currentIndex = speeds.indexOf(playbackRate);
		const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
		audio.playbackRate = nextSpeed;
		setPlaybackRate(nextSpeed);
	};

	const formatTime = (time: number) => {
		if (isNaN(time)) return "0:00";
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	return (
		<div className="w-full max-w-140 bg-card border border-border rounded-lg p-3 shadow-sm">
			<audio ref={audioRef} src={audioUrl} preload="metadata" />

			{/* Controls Row */}
			<div className="flex items-center gap-3">
				{/* Play/Pause */}
				<button
					onClick={togglePlayPause}
					className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 p-2 transition-colors cursor-pointer shrink-0"
					aria-label={isPlaying ? "Pause" : "Play"}
					title={error || (isPlaying ? "Pause" : "Play")}
				>
					{isPlaying ? (
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<rect x="6" y="4" width="4" height="16" />
							<rect x="14" y="4" width="4" height="16" />
						</svg>
					) : (
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<polygon points="6 3 20 12 6 21 6 3" />
						</svg>
					)}
				</button>

				{/* Skip Backward */}
				<button
					onClick={() => skip(-5)}
					className="inline-flex items-center justify-center hover:bg-secondary rounded p-1.5 transition-colors cursor-pointer shrink-0"
					aria-label="Skip backward 5 seconds"
					title="Skip backward 5s"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M2.5 2v6h6" />
						<path d="M2.66 15.57a10 10 0 1 0 .57-8.38" />
						<text
							x="11"
							y="15"
							fontSize="9"
							fill="currentColor"
							fontWeight="bold"
						>
							5
						</text>
					</svg>
				</button>

				{/* Progress Bar */}
				<div className="flex-1 min-w-0">
					<input
						type="range"
						min="0"
						max={duration || 0}
						step="0.1"
						value={currentTime || 0}
						onChange={handleProgressChange}
						className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
						aria-label="Audio progress"
					/>
				</div>

				{/* Skip Forward */}
				<button
					onClick={() => skip(5)}
					className="inline-flex items-center justify-center hover:bg-secondary rounded p-1.5 transition-colors cursor-pointer shrink-0"
					aria-label="Skip forward 5 seconds"
					title="Skip forward 5s"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M21.5 2v6h-6" />
						<path d="M21.34 15.57a10 10 0 1 1-.57-8.38" />
						<text
							x="7"
							y="15"
							fontSize="9"
							fill="currentColor"
							fontWeight="bold"
						>
							5
						</text>
					</svg>
				</button>

				{/* Time Display */}
				<div className="text-xs text-muted-foreground shrink-0 min-w-[80px] text-right">
					{formatTime(currentTime)} / {formatTime(duration)}
				</div>

				{/* Playback Speed */}
				<button
					onClick={cyclePlaybackSpeed}
					className="inline-flex items-center justify-center hover:bg-secondary rounded px-2 py-1 text-xs font-medium transition-colors cursor-pointer shrink-0 min-w-[38px]"
					aria-label={`Playback speed: ${playbackRate}x`}
					title="Change playback speed"
				>
					{playbackRate}x
				</button>

				{/* Volume Control */}
				<div className="relative shrink-0">
					<button
						onClick={() => setShowVolumeSlider(!showVolumeSlider)}
						className="inline-flex items-center justify-center hover:bg-secondary rounded p-1.5 transition-colors cursor-pointer"
						aria-label="Volume control"
						title={`Volume: ${volume}`}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
							{volume > 5 && (
								<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
							)}
							{volume > 0 && volume <= 5 && (
								<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
							)}
							{volume === 0 && (
								<>
									<line x1="23" y1="9" x2="17" y2="15" />
									<line x1="17" y1="9" x2="23" y2="15" />
								</>
							)}
						</svg>
					</button>

					{/* Volume Slider Popup */}
					{showVolumeSlider && (
						<div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-lg p-2 shadow-lg z-10">
							<div className="flex flex-col items-center gap-2">
								<input
									type="range"
									min="0"
									max="10"
									step="1"
									value={volume}
									onChange={handleVolumeChange}
									className="h-16 w-1.5 bg-secondary rounded-lg appearance-none cursor-pointer [writing-mode:vertical-lr] [direction:rtl] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
									aria-label="Volume"
								/>
								<span className="text-[10px] text-muted-foreground w-4 text-center">
									{volume}
								</span>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Error Message */}
			{error && (
				<div className="mt-2 text-xs text-destructive">{error}</div>
			)}
		</div>
	);
}
