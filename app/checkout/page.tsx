"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart-context";
import { createOrder } from "@/app/actions/order";

export default function CheckoutPage() {
  const { items, totalPrice, clear } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await createOrder({
      ...form,
      items: items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        image: i.image,
        quantity: i.quantity,
      })),
    });

    setLoading(false);

    if (!result.success || !result.order) {
      setError(result.error || "Failed to place order.");
      return;
    }

    clear();
    router.push(`/order-confirmation/${result.order.id}`);
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="py-16 min-h-[60vh] bg-bg-primary text-center">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-text-light text-lg mb-8">Your cart is empty.</p>
            <Link
              href="/shop"
              className="inline-block bg-brand-gold text-black px-10 py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:bg-brand-gold-dark"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="py-16 min-h-[60vh] bg-bg-primary">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-center text-4xl mb-12 text-brand-gold-dark font-heading font-medium tracking-wide">
            Checkout
          </h1>

          <div className="flex flex-col lg:flex-row gap-12">
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
              <h2 className="font-heading text-2xl text-text-primary mb-2">Shipping Details</h2>

              {error && (
                <p className="text-red-400 text-sm bg-red-950/30 border border-red-900 px-4 py-3 rounded">
                  {error}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="bg-bg-secondary border border-border-color px-4 py-3 outline-none focus:border-brand-gold-dark transition-colors text-text-primary placeholder:text-text-light"
                />
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="bg-bg-secondary border border-border-color px-4 py-3 outline-none focus:border-brand-gold-dark transition-colors text-text-primary placeholder:text-text-light"
                />
              </div>

              <input
                required
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="bg-bg-secondary border border-border-color px-4 py-3 outline-none focus:border-brand-gold-dark transition-colors text-text-primary placeholder:text-text-light"
              />

              <input
                required
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street Address"
                className="bg-bg-secondary border border-border-color px-4 py-3 outline-none focus:border-brand-gold-dark transition-colors text-text-primary placeholder:text-text-light"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <input
                  required
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="bg-bg-secondary border border-border-color px-4 py-3 outline-none focus:border-brand-gold-dark transition-colors text-text-primary placeholder:text-text-light"
                />
                <input
                  required
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="bg-bg-secondary border border-border-color px-4 py-3 outline-none focus:border-brand-gold-dark transition-colors text-text-primary placeholder:text-text-light"
                />
                <input
                  required
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className="bg-bg-secondary border border-border-color px-4 py-3 outline-none focus:border-brand-gold-dark transition-colors text-text-primary placeholder:text-text-light"
                />
              </div>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Order notes (optional)"
                rows={3}
                className="bg-bg-secondary border border-border-color px-4 py-3 outline-none focus:border-brand-gold-dark transition-colors text-text-primary placeholder:text-text-light resize-none"
              />

              <div className="bg-bg-secondary border border-border-color px-4 py-4 text-sm text-text-secondary">
                Payment method: <span className="text-brand-gold-dark font-medium">Cash on Delivery</span>. Our team will call to confirm your order before dispatch.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full p-4 text-base font-semibold bg-brand-gold text-black uppercase tracking-wide transition-colors hover:bg-brand-gold-dark disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>

            <div className="lg:w-[340px] flex-shrink-0">
              <div className="bg-bg-secondary rounded-lg p-8 sticky top-[100px]">
                <h2 className="font-heading text-2xl mb-6 text-text-primary">Order Summary</h2>
                <div className="flex flex-col gap-4 mb-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm text-text-secondary">
                      <span>
                        {item.name} <span className="text-text-light">× {item.quantity}</span>
                      </span>
                      <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-semibold text-lg text-text-primary border-t border-border-color pt-4">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
