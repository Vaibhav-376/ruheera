"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const HERO_IMAGES = [
  "/IMG_7287.JPG",
  "/IMG_7299.JPG",
  "/IMG_7324.JPG",
  "/IMG_7344.JPG"
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[calc(100vh-80px)] min-h-[500px] overflow-hidden flex items-center justify-center text-center text-white">
      {/* Background Images */}
      {HERO_IMAGES.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${img}')` }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-[600px] mx-auto px-6">
        <h1 className="text-5xl md:text-[56px] mb-6 text-white font-heading font-medium">Discover Elegance</h1>
        <p className="text-lg mb-8 font-medium">Premium jewellery crafted with perfection for your special moments.</p>
        <Link href="/shop" className="inline-block px-8 py-4 text-base bg-brand-gold-dark text-black uppercase tracking-wide transition-colors border border-brand-gold-dark hover:bg-black hover:text-brand-gold-dark">
          Explore Collection
        </Link>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex ? "bg-brand-gold-dark w-8" : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
