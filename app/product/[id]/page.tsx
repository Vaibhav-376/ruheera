import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getProduct } from "@/app/actions/product";
import { ImageGallery } from "./_components/ImageGallery";
import { AddToCartBox } from "./_components/AddToCartBox";
import Link from "next/link";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { product, success } = await getProduct(resolvedParams.id);

  if (!success || !product) {
    return (
      <>
        <Header />
        <main className="py-[100px] text-center min-h-[60vh]">
          <div className="max-w-[1200px] mx-auto px-6">
            <h1 className="mb-6 text-3xl font-heading text-text-primary">Product Not Found</h1>
            <Link href="/shop" className="inline-block bg-text-primary text-bg-primary px-6 py-3 text-sm uppercase tracking-wide border border-text-primary transition-colors hover:bg-bg-primary hover:text-text-primary">Back to Shop</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="py-16 min-h-[60vh]">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 max-w-[1200px] mx-auto px-6">
          <div className="flex-1 min-w-0">
            <ImageGallery images={product.images || []} alt={product.name} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-[32px] mb-4 text-text-primary font-heading font-medium">{product.name}</h1>
            <p className="text-2xl font-semibold text-brand-gold-dark mb-6">₹{product.price}</p>
            
            {product.weight && (
              <p className="text-sm text-text-secondary mb-8">Weight: {product.weight}g</p>
            )}
            
            <div className="mb-10">
              <h3 className="font-body text-base uppercase tracking-wide mb-3 border-b border-border-color pb-2 font-medium">Description</h3>
              <p className="text-text-secondary leading-[1.8]">{product.description}</p>
            </div>
            
            <AddToCartBox
              productId={product.id}
              name={product.name}
              price={product.price}
              image={product.images?.[0]}
            />
            
            <div>
              <ul className="flex flex-col gap-3">
                <li className="text-text-secondary text-sm flex items-center">✓ Authenticity Guaranteed</li>
                <li className="text-text-secondary text-sm flex items-center">✓ Free Insured Shipping</li>
                <li className="text-text-secondary text-sm flex items-center">✓ 15-Day Easy Returns</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
