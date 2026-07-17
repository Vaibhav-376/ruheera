"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minus, Plus, X } from "lucide-react";

export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragState = useRef<{ dragging: boolean; startX: number; startY: number; originX: number; originY: number }>({
    dragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const hasImages = images && images.length > 0;

  const goTo = (index: number) => {
    if (!hasImages) return;
    setCurrentIndex(((index % images.length) + images.length) % images.length);
  };
  const goPrev = () => goTo(currentIndex - 1);
  const goNext = () => goTo(currentIndex + 1);

  const openLightbox = () => {
    setLightboxZoom(1);
    setPan({ x: 0, y: 0 });
    setIsLightboxOpen(true);
  };
  const closeLightbox = () => setIsLightboxOpen(false);
  const zoomIn = () => setLightboxZoom((z) => Math.min(3, z + 0.5));
  const zoomOut = () =>
    setLightboxZoom((z) => {
      const next = Math.max(1, z - 0.5);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLightboxOpen, currentIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  const handleDragStart = (e: React.MouseEvent) => {
    if (lightboxZoom === 1) return;
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: pan.x,
      originY: pan.y,
    };
  };
  const handleDragMove = (e: React.MouseEvent) => {
    if (!dragState.current.dragging) return;
    setPan({
      x: dragState.current.originX + (e.clientX - dragState.current.startX),
      y: dragState.current.originY + (e.clientY - dragState.current.startY),
    });
  };
  const handleDragEnd = () => {
    dragState.current.dragging = false;
  };

  if (!hasImages) {
    return (
      <div className="w-full aspect-square bg-bg-elevated rounded-lg flex items-center justify-center text-text-light">
        No images available
      </div>
    );
  }

  const mainImage = images[currentIndex];

  return (
    <div className="flex flex-col gap-4">
      <div
        className="w-full aspect-square bg-bg-elevated rounded-lg overflow-hidden relative group/gallery cursor-zoom-in"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
        onClick={openLightbox}
      >
        <img
          src={mainImage}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{
            transformOrigin: zoomOrigin,
            transform: isZooming ? "scale(1.8)" : "scale(1)",
          }}
        />

        {/* Prev / Next controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center bg-black/40 text-white backdrop-blur-md opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-brand-gold-dark hover:text-black"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center bg-black/40 text-white backdrop-blur-md opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-brand-gold-dark hover:text-black"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </>
        )}

        {/* Zoom button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openLightbox();
          }}
          aria-label="Open zoom view"
          className="absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-brand-gold-dark hover:text-black"
        >
          <Maximize2 size={16} strokeWidth={1.5} />
        </button>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/40 text-white text-xs backdrop-blur-md">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              className={`w-20 h-20 shrink-0 rounded overflow-hidden border-2 transition-colors p-0 bg-bg-elevated ${
                currentIndex === index ? "border-brand-gold-dark" : "border-transparent"
              }`}
              onClick={() => goTo(index)}
            >
              <img src={img} alt={`${alt} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close zoom view"
            className="absolute top-6 right-6 h-11 w-11 rounded-full flex items-center justify-center bg-white/10 text-white transition-colors hover:bg-brand-gold-dark hover:text-black"
          >
            <X size={22} strokeWidth={1.5} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxZoom(1);
                  setPan({ x: 0, y: 0 });
                  goPrev();
                }}
                aria-label="Previous image"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full flex items-center justify-center bg-white/10 text-white transition-colors hover:bg-brand-gold-dark hover:text-black"
              >
                <ChevronLeft size={24} strokeWidth={1.5} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxZoom(1);
                  setPan({ x: 0, y: 0 });
                  goNext();
                }}
                aria-label="Next image"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full flex items-center justify-center bg-white/10 text-white transition-colors hover:bg-brand-gold-dark hover:text-black"
              >
                <ChevronRight size={24} strokeWidth={1.5} />
              </button>
            </>
          )}

          <div
            className="w-[90vw] h-[80vh] flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={mainImage}
              alt={alt}
              draggable={false}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              className="max-w-full max-h-full object-contain select-none transition-transform duration-150"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${lightboxZoom})`,
                cursor: lightboxZoom > 1 ? "grab" : "default",
              }}
            />
          </div>

          {/* Zoom controls */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={zoomOut}
              aria-label="Zoom out"
              disabled={lightboxZoom <= 1}
              className="h-8 w-8 rounded-full flex items-center justify-center text-white transition-colors hover:text-brand-gold disabled:opacity-30"
            >
              <Minus size={16} strokeWidth={1.5} />
            </button>
            <span className="text-white text-xs w-10 text-center">{Math.round(lightboxZoom * 100)}%</span>
            <button
              onClick={zoomIn}
              aria-label="Zoom in"
              disabled={lightboxZoom >= 3}
              className="h-8 w-8 rounded-full flex items-center justify-center text-white transition-colors hover:text-brand-gold disabled:opacity-30"
            >
              <Plus size={16} strokeWidth={1.5} />
            </button>
            {images.length > 1 && (
              <span className="text-white/70 text-xs pl-3 border-l border-white/20">
                {currentIndex + 1} / {images.length}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
