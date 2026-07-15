"use client";

import { useState } from "react";

export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [mainImage, setMainImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-bg-accent rounded-lg flex items-center justify-center text-text-light">
        No images available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full aspect-square bg-bg-accent rounded-lg overflow-hidden">
        <img src={mainImage} alt={alt} className="w-full h-full object-cover" />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button 
              key={index} 
              className={`w-20 h-20 shrink-0 rounded overflow-hidden border-2 transition-colors p-0 bg-bg-accent ${mainImage === img ? 'border-brand-gold-dark' : 'border-transparent'}`}
              onClick={() => setMainImage(img)}
            >
              <img src={img} alt={`${alt} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
