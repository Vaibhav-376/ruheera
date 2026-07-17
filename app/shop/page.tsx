import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { getProducts } from "@/app/actions/product";
import { getCategories } from "@/app/actions/category";
import { ProductCard } from "@/components/ProductCard";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ShopPage(props: Props) {
  const searchParams = await props.searchParams;
  const categoryId = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const gender = typeof searchParams.gender === 'string' ? searchParams.gender : undefined;
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;

  const [{ products }, { categories }] = await Promise.all([
    getProducts(categoryId, gender, search),
    getCategories()
  ]);

  const currentCategory = categoryId ? categories?.find(c => c.id === categoryId) : null;
  let title = currentCategory ? `${currentCategory.name} Collection` : "All Collection";
  if (gender) {
    const genderTitle = gender.charAt(0) + gender.slice(1).toLowerCase();
    title = currentCategory ? `${genderTitle}'s ${currentCategory.name}` : `${genderTitle}'s Collection`;
  }
  if (search) {
    title = `Results for "${search}"`;
  }

  return (
    <>
      <Header />
      <main className="py-16 min-h-[60vh] bg-bg-primary">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-center text-4xl mb-8 text-brand-gold-dark font-heading font-medium tracking-wide">{title}</h1>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              href={gender ? `/shop?gender=${gender}` : "/shop"}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!categoryId ? 'bg-brand-gold text-black' : 'bg-bg-secondary text-text-secondary hover:bg-brand-gold hover:text-black'}`}
            >
              All
            </Link>
            {categories?.map((cat) => (
              <Link
                key={cat.id}
                href={gender ? `/shop?category=${cat.id}&gender=${gender}` : `/shop?category=${cat.id}`}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${categoryId === cat.id ? 'bg-brand-gold text-black' : 'bg-bg-secondary text-text-secondary hover:bg-brand-gold hover:text-black'}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8 mb-12">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-text-light text-lg">
                <p>
                  {search
                    ? `No products matched "${search}". Try a different search term.`
                    : "No products available in this category yet. Please check back later."}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
