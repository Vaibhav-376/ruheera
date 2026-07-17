"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import { X, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
  const { items, remove } = useWishlist();
  const { addItem } = useCart();

  return (
    <>
      <Header />
      <main className="py-16 min-h-[60vh] bg-bg-primary">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-center text-4xl mb-12 text-brand-gold-dark font-heading font-medium tracking-wide">
            Your Wishlist
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-light text-lg mb-8">Your wishlist is empty.</p>
              <Link
                href="/shop"
                className="inline-block bg-brand-gold text-black px-10 py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:bg-brand-gold-dark"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
              {items.map((item) => (
                <div key={item.productId} className="bg-bg-secondary rounded-lg overflow-hidden group relative">
                  <button
                    onClick={() => remove(item.productId)}
                    aria-label="Remove from wishlist"
                    className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full flex items-center justify-center bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors"
                  >
                    <X size={16} />
                  </button>
                  <Link href={`/product/${item.productId}`} className="block">
                    <div className="w-full aspect-square overflow-hidden bg-[#f5f5f5]">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-light text-sm">No Image</div>
                      )}
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-lg mb-2 font-heading font-medium text-text-primary tracking-wide">{item.name}</h3>
                      <p className="font-medium text-brand-gold-dark mb-4">₹{item.price}</p>
                    </div>
                  </Link>
                  <div className="px-6 pb-6">
                    <button
                      onClick={() => addItem(item)}
                      className="w-full flex items-center justify-center gap-2 border border-brand-gold-dark text-brand-gold-dark px-4 py-3 text-xs uppercase tracking-widest font-semibold transition-colors hover:bg-brand-gold-dark hover:text-black"
                    >
                      <ShoppingBag size={14} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
