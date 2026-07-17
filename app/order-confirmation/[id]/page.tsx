import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getOrder } from "@/app/actions/order";
import { CheckCircle2 } from "lucide-react";

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { order, success } = await getOrder(id);

  if (!success || !order) {
    return (
      <>
        <Header />
        <main className="py-[100px] text-center min-h-[60vh]">
          <div className="max-w-[1200px] mx-auto px-6">
            <h1 className="mb-6 text-3xl font-heading text-text-primary">Order Not Found</h1>
            <Link href="/shop" className="inline-block bg-text-primary text-bg-primary px-6 py-3 text-sm uppercase tracking-wide border border-text-primary transition-colors hover:bg-bg-primary hover:text-text-primary">
              Back to Shop
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
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <CheckCircle2 size={64} strokeWidth={1} className="mx-auto mb-6 text-brand-gold-dark" />
          <h1 className="text-4xl mb-4 text-brand-gold-dark font-heading font-medium tracking-wide">
            Thank You, {order.name}!
          </h1>
          <p className="text-text-secondary mb-2">Your order has been placed successfully.</p>
          <p className="text-text-light text-sm mb-10">
            Order ID: <span className="text-text-secondary">{order.id}</span>
          </p>

          <div className="bg-bg-secondary rounded-lg p-8 text-left mb-10">
            <h2 className="font-heading text-2xl mb-6 text-text-primary">Order Summary</h2>
            <div className="flex flex-col gap-4 mb-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-text-secondary">
                  <span>
                    {item.name} <span className="text-text-light">× {item.quantity}</span>
                  </span>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-semibold text-lg text-text-primary border-t border-border-color pt-4 mb-6">
              <span>Total</span>
              <span>₹{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="text-sm text-text-secondary border-t border-border-color pt-6">
              <p className="mb-1">
                <span className="text-text-light">Payment Method:</span> Cash on Delivery
              </p>
              <p className="mb-1">
                <span className="text-text-light">Shipping To:</span> {order.address}, {order.city}, {order.state} {order.postalCode}
              </p>
              <p>
                <span className="text-text-light">Status:</span> {order.status}
              </p>
            </div>
          </div>

          <p className="text-text-secondary mb-8">
            Our team will contact you at {order.phone} shortly to confirm your order before dispatch.
          </p>

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
