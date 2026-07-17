"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart-context";
import { Minus, Plus, X } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <>
      <Header />
      <main className="py-16 min-h-[60vh] bg-bg-primary">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-center text-4xl mb-12 text-brand-gold-dark font-heading font-medium tracking-wide">
            Your Cart
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-light text-lg mb-8">Your cart is empty.</p>
              <Link
                href="/shop"
                className="inline-block bg-brand-gold text-black px-10 py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:bg-brand-gold-dark"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1 flex flex-col gap-6">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-6 bg-bg-secondary rounded-lg p-4"
                  >
                    <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-[#f5f5f5]">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-light text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.productId}`}
                        className="font-heading text-lg text-text-primary hover:text-brand-gold-dark transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-brand-gold-dark font-medium mt-1">₹{item.price}</p>
                    </div>
                    <div className="flex items-center border border-border-color">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-2 text-text-primary hover:text-brand-gold-dark transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-2 text-text-primary hover:text-brand-gold-dark transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="w-24 text-right font-medium text-text-primary">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      aria-label="Remove item"
                      className="text-text-light hover:text-red-500 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="lg:w-[340px] flex-shrink-0">
                <div className="bg-bg-secondary rounded-lg p-8 sticky top-[100px]">
                  <h2 className="font-heading text-2xl mb-6 text-text-primary">Order Summary</h2>
                  <div className="flex justify-between text-text-secondary mb-3">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-text-light text-sm mb-6">Shipping and payment details are confirmed at checkout.</p>
                  <div className="flex justify-between font-semibold text-lg text-text-primary border-t border-border-color pt-4 mb-8">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <Link
                    href="/checkout"
                    className="block text-center w-full bg-brand-gold text-black px-6 py-4 text-sm uppercase tracking-widest font-semibold transition-all duration-300 hover:bg-brand-gold-dark"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
