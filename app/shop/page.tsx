import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { getProducts } from "@/app/actions/product";
import { getCategories } from "@/app/actions/category";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ShopPage(props: Props) {
  const searchParams = await props.searchParams;
  const categoryId = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  
  const [{ products }, { categories }] = await Promise.all([
    getProducts(categoryId),
    getCategories()
  ]);

  const currentCategory = categoryId ? categories?.find(c => c.id === categoryId) : null;
  const title = currentCategory ? `${currentCategory.name} Collection` : "All Collection";

  return (
    <>
      <Header />
      <main className="py-16 min-h-[60vh] bg-bg-primary">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-center text-4xl mb-8 text-brand-gold-dark font-heading font-medium tracking-wide">{title}</h1>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link 
              href="/shop" 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!categoryId ? 'bg-brand-gold text-black' : 'bg-bg-secondary text-text-secondary hover:bg-brand-gold hover:text-black'}`}
            >
              All
            </Link>
            {categories?.map((cat) => (
              <Link 
                key={cat.id}
                href={`/shop?category=${cat.id}`} 
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${categoryId === cat.id ? 'bg-brand-gold text-black' : 'bg-bg-secondary text-text-secondary hover:bg-brand-gold hover:text-black'}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8 mb-12">
            {products && products.length > 0 ? (
              products.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id} className="block bg-bg-secondary rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group">
                  <div className="w-full aspect-square overflow-hidden bg-[#f5f5f5]">
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-light text-sm">No Image</div>
                    )}
                  </div>
                  <div className="p-6 text-center bg-bg-secondary">
                    <h3 className="text-lg mb-2 font-heading font-medium text-text-primary tracking-wide">{product.name}</h3>
                    <p className="font-medium text-brand-gold-dark">₹{product.price}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-text-light text-lg">
                <p>No products available in this category yet. Please check back later.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
