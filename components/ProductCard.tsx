"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

export type ProductCardData = {
  id: string;
  name: string;
  price: number;
  images: string[];
};

export function ProductCard({ product, priceOnly }: { product: ProductCardData; priceOnly?: boolean }) {
  const { addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const router = useRouter();
  const inWishlist = isInWishlist(product.id);
  const image = product.images && product.images.length > 0 ? product.images[0] : undefined;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ productId: product.id, name: product.name, price: product.price, image });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ productId: product.id, name: product.name, price: product.price, image });
    router.push("/checkout");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle({ productId: product.id, name: product.name, price: product.price, image });
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="block bg-bg-secondary rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group relative"
    >
      <div className="w-full aspect-square overflow-hidden bg-[#f5f5f5] relative">
        {image ? (
          <img src={image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-light text-sm">No Image</div>
        )}
        <button
          onClick={handleToggleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
            inWishlist ? "bg-brand-gold-dark text-black" : "bg-black/40 text-white hover:bg-black/60"
          }`}
        >
          <Heart size={16} strokeWidth={1.5} fill={inWishlist ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-6 text-center bg-bg-secondary">
        <h3 className="text-lg mb-2 font-heading font-medium text-text-primary tracking-wide">{product.name}</h3>
        <p className="font-medium text-brand-gold-dark mb-4">₹{product.price}</p>

        {!priceOnly && (
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-1.5 border border-brand-gold-dark text-brand-gold-dark px-3 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors hover:bg-brand-gold-dark hover:text-black"
            >
              <ShoppingBag size={14} strokeWidth={1.5} />
              Add
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-brand-gold text-black px-3 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors hover:bg-brand-gold-dark"
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}
