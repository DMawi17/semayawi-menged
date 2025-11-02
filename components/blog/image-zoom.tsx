"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface ImageZoomProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function ImageZoom({ src, alt, width = 800, height = 600 }: ImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative group cursor-zoom-in" onClick={() => setIsOpen(true)}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
          <ZoomIn className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <div className="relative max-w-7xl max-h-[90vh]">
            <Image
              src={src}
              alt={alt}
              width={1920}
              height={1080}
              className="max-h-[90vh] w-auto h-auto object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
