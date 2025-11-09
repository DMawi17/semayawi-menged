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
  const [volume, setVolume] = useState(1);
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
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

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
    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
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
    <div className="w-full bg-card border border-border rounded-lg p-4 shadow-sm">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Title */}
      {title && (
        <div className="mb-3 text-sm font-medium text-foreground line-clamp-1">
          {title}
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-3">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
          aria-label="Audio progress"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-2">
        {/* Left: Playback controls */}
        <div className="flex items-center gap-1">
          {/* Skip backward */}
          <button
            onClick={() => skip(-5)}
            className="inline-flex items-center justify-center rounded-md hover:bg-secondary p-2 transition-colors cursor-pointer"
            aria-label="Skip backward 5 seconds"
            title="Skip backward 5s"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 19a8 8 0 1 0 0-14" />
              <path d="M11 5 5 5 5 11" />
              <text x="12" y="16" fontSize="10" fill="currentColor" fontWeight="bold">5</text>
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlayPause}
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 p-2.5 transition-colors cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
            title={error || (isPlaying ? "Pause" : "Play")}
          >
            {isPlaying ? (
              // Pause icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              // Play icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          {/* Skip forward */}
          <button
            onClick={() => skip(5)}
            className="inline-flex items-center justify-center rounded-md hover:bg-secondary p-2 transition-colors cursor-pointer"
            aria-label="Skip forward 5 seconds"
            title="Skip forward 5s"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 19a8 8 0 1 0 0-14" />
              <path d="M13 5 19 5 19 11" />
              <text x="6" y="16" fontSize="10" fill="currentColor" fontWeight="bold">5</text>
            </svg>
          </button>
        </div>

        {/* Right: Volume and Speed */}
        <div className="flex items-center gap-1">
          {/* Playback speed */}
          <button
            onClick={cyclePlaybackSpeed}
            className="inline-flex items-center justify-center rounded-md hover:bg-secondary px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer min-w-[42px]"
            aria-label={`Playback speed: ${playbackRate}x`}
            title="Change playback speed"
          >
            {playbackRate}x
          </button>

          {/* Volume control */}
          <div className="relative">
            <button
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="inline-flex items-center justify-center rounded-md hover:bg-secondary p-2 transition-colors cursor-pointer"
              aria-label="Volume control"
              title={`Volume: ${Math.round(volume * 100)}%`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                {volume > 0.5 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
                {volume > 0.7 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
                {volume === 0 && <line x1="23" y1="9" x2="17" y2="15" />}
                {volume === 0 && <line x1="17" y1="9" x2="23" y2="15" />}
              </svg>
            </button>

            {/* Volume slider popup */}
            {showVolumeSlider && (
              <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-lg p-3 shadow-lg">
                <div className="flex flex-col items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="h-20 w-2 bg-secondary rounded-lg appearance-none cursor-pointer [writing-mode:vertical-lr] [direction:rtl] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                    aria-label="Volume"
                  />
                  <span className="text-xs text-muted-foreground">{Math.round(volume * 100)}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-2 text-xs text-destructive">
          {error}
        </div>
      )}
    </div>
  );
}
