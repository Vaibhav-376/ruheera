"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

type Props = {
  productId: string;
  name: string;
  price: number;
  image?: string;
};

export function AddToCartBox({ productId, name, price, image }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const router = useRouter();
  const inWishlist = isInWishlist(productId);

  const handleAddToCart = () => {
    addItem({ productId, name, price, image }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem({ productId, name, price, image }, quantity);
    router.push("/checkout");
  };

  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm uppercase tracking-wide text-text-secondary">Quantity</span>
        <div className="flex items-center border border-border-color">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-3 text-text-primary hover:text-brand-gold-dark transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="p-3 text-text-primary hover:text-brand-gold-dark transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 p-4 text-base font-semibold bg-text-primary text-bg-primary uppercase tracking-wide border border-text-primary transition-colors hover:bg-bg-primary hover:text-text-primary cursor-pointer"
        >
          {added ? "Added to Cart ✓" : "Add to Cart"}
        </button>
        <button
          onClick={() => toggle({ productId, name, price, image })}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`px-5 border transition-colors ${
            inWishlist
              ? "bg-brand-gold-dark text-black border-brand-gold-dark"
              : "border-border-color text-text-primary hover:border-brand-gold-dark hover:text-brand-gold-dark"
          }`}
        >
          <Heart size={20} strokeWidth={1.5} fill={inWishlist ? "currentColor" : "none"} />
        </button>
      </div>
      <button
        onClick={handleBuyNow}
        className="w-full mt-3 p-4 text-base font-semibold bg-brand-gold text-black uppercase tracking-wide border border-brand-gold transition-colors hover:bg-brand-gold-dark cursor-pointer"
      >
        Buy Now
      </button>
    </div>
  );
}
