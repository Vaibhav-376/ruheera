import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { getProducts } from "@/app/actions/product";
import { getCategories } from "@/app/actions/category";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Package, ShieldCheck, Mail } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { products } = await getProducts();
  const { categories } = await getCategories();
  
  // Get latest 4 products for featured section
  const featuredProducts = products?.slice(0, 4) || [];
  const displayCategories = categories || [];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <HeroCarousel />

        {/* Featured Collection */}
        <section className="py-10 md:py-14 bg-bg-primary">
          <div className="max-w-[1200px] mx-auto px-6">
            <FadeIn>
              <h2 className="text-center text-4xl md:text-5xl mb-16 text-brand-gold-dark font-heading font-medium tracking-wide">Featured Collection</h2>
            </FadeIn>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10 mb-16">
              {featuredProducts.map((product, idx) => (
                <FadeIn key={product.id} delay={idx * 0.1}>
                  <ProductCard product={product} />
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.4}>
              <div className="text-center">
                <Link href="/shop" className="inline-block bg-transparent text-text-primary px-10 py-4 text-sm uppercase tracking-widest border border-text-primary transition-all duration-300 hover:bg-brand-gold hover:text-black hover:border-brand-gold">
                  View All Jewellery
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-10 md:py-14 bg-bg-secondary">
          <div className="max-w-[1200px] mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-center text-4xl md:text-5xl text-brand-gold-dark font-heading font-medium tracking-wide">Shop by Category</h2>
                <p className="text-text-secondary text-lg mt-4 font-light">Explore our masterfully crafted collections</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
              {displayCategories.map((category, idx) => (
                <FadeIn key={category.id} delay={idx * 0.15}>
                  <div className="relative rounded-lg overflow-hidden aspect-[4/5] group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500">
                    <div 
                      className="w-full h-full bg-contain bg-no-repeat bg-center transition-transform duration-1000 group-hover:scale-110"
                      style={{ backgroundImage: `url('${category.image || '/IMG_0116.JPG'}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-full p-8 text-white flex flex-col items-center transform transition-transform duration-500">
                      <h3 className="font-heading text-3xl mb-3 text-white font-medium tracking-wide">{category.name}</h3>
                      <Link href={`/shop?category=${category.id}`} className="text-brand-gold uppercase text-sm tracking-widest font-bold opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 before:absolute before:inset-0">
                        Discover
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
              {displayCategories.length === 0 && (
                <p className="col-span-full text-center text-text-light text-lg py-8">No categories available yet.</p>
              )}
            </div>
          </div>
        </section>

        {/* Curated Collections Section */}
        <section className="py-10 md:py-14 bg-bg-primary">
          <div className="max-w-[1200px] mx-auto px-6">
            <FadeIn>
              <div className="flex flex-col md:flex-row items-center justify-between mb-16">
                <div>
                  <h2 className="text-4xl md:text-5xl text-brand-gold-dark font-heading font-medium tracking-wide">Curated Collections</h2>
                  <p className="text-text-secondary text-lg mt-4 font-light">Discover jewellery designed for every chapter of your life.</p>
                </div>
                <Link href="/shop" className="mt-8 md:mt-0 inline-block bg-transparent text-text-primary px-8 py-3 text-sm uppercase tracking-widest border border-border-color transition-all duration-300 hover:border-brand-gold hover:bg-brand-gold hover:text-black">
                  View All
                </Link>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <FadeIn delay={0.1}>
                <div className="group cursor-pointer">
                  <div className="w-full aspect-[3/4] overflow-hidden rounded-lg mb-8 shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <img src="/IMG_4692.JPG" alt="Chic Charms" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                  <h3 className="font-heading text-3xl mb-3 text-text-primary">Chic Charms</h3>
                  <p className="text-text-secondary mb-5 font-light leading-relaxed">Unique, stylish charms and accessories to elevate your everyday look.</p>
                  <span className="text-brand-gold-dark uppercase tracking-widest text-xs font-bold border-b border-transparent group-hover:border-brand-gold-dark pb-1 transition-all">Explore Collection</span>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <div className="group cursor-pointer">
                  <div className="w-full aspect-[3/4] overflow-hidden rounded-lg mb-8 shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <img src="/IMG_0125.JPG" alt="Everyday Elegance" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                  <h3 className="font-heading text-3xl mb-3 text-text-primary">Everyday Elegance</h3>
                  <p className="text-text-secondary mb-5 font-light leading-relaxed">Minimalist designs crafted for your daily wear.</p>
                  <span className="text-brand-gold-dark uppercase tracking-widest text-xs font-bold border-b border-transparent group-hover:border-brand-gold-dark pb-1 transition-all">Explore Collection</span>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <div className="group cursor-pointer">
                  <div className="w-full aspect-[3/4] overflow-hidden rounded-lg mb-8 shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <img src="/IMG_7358.JPG" alt="Statement Pieces" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                  <h3 className="font-heading text-3xl mb-3 text-text-primary">Statement Pieces</h3>
                  <p className="text-text-secondary mb-5 font-light leading-relaxed">Bold, captivating designs that demand attention.</p>
                  <span className="text-brand-gold-dark uppercase tracking-widest text-xs font-bold border-b border-transparent group-hover:border-brand-gold-dark pb-1 transition-all">Explore Collection</span>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Features / Trust Section */}
        <section className="py-10 md:py-14 bg-bg-secondary border-y border-border-color">
          <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <FadeIn delay={0.1}>
              <div className="flex flex-col items-center">
                <div className="w-[80px] h-[80px] rounded-full border border-brand-gold-dark/30 flex items-center justify-center mb-8 text-brand-gold-dark bg-bg-primary shadow-sm transition-transform duration-500 hover:-translate-y-2">
                  <Package strokeWidth={1} size={32} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-text-primary mb-4">Global Shipping</h3>
                <p className="text-base text-text-secondary font-light">Direct to your doorstep, anywhere in the world.</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="flex flex-col items-center">
                <div className="w-[80px] h-[80px] rounded-full border border-brand-gold-dark/30 flex items-center justify-center mb-8 text-brand-gold-dark bg-bg-primary shadow-sm transition-transform duration-500 hover:-translate-y-2">
                  <ShieldCheck strokeWidth={1} size={32} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-text-primary mb-4">Secure Checkout</h3>
                <p className="text-base text-text-secondary font-light">Encrypted payments and data protection.</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="flex flex-col items-center">
                <div className="w-[80px] h-[80px] rounded-full border border-brand-gold-dark/30 flex items-center justify-center mb-8 text-brand-gold-dark bg-bg-primary shadow-sm transition-transform duration-500 hover:-translate-y-2">
                  <Mail strokeWidth={1} size={32} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-text-primary mb-4">Personal Service</h3>
                <p className="text-base text-text-secondary font-light">Our dedicated team is here to assist you.</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* About Section Expanded */}
        <section className="py-10 md:py-14 bg-bg-primary overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-20 max-w-[1200px] mx-auto px-6">
            <div className="flex-1 w-full relative">
              <FadeIn direction="right">
                <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src="/IMG_3154.JPG"
                    alt="Ruheera jewellery heritage"
                    className="w-full h-full object-cover object-center block"
                  />
                </div>
              </FadeIn>
            </div>
            <div className="flex-1">
              <FadeIn direction="left" delay={0.2}>
                <h2 className="text-left text-4xl md:text-5xl mb-8 text-brand-gold-dark font-heading font-medium tracking-wide">The Ruheera Heritage</h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-6 font-light">
                  Founded on the principles of timeless elegance and unparalleled craftsmanship, Ruheera has been the destination for those who seek the extraordinary. Every piece of jewellery at Ruheera tells a story of heritage, passion, and meticulous attention to detail.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed mb-10 font-light">
                  We source only the finest ethical diamonds, precious gemstones, and purest metals. Our master artisans blend traditional techniques with modern design sensibilities to bring you collections that celebrate your individuality and mark your most precious moments.
                </p>
                <Link href="/our-story" className="inline-block bg-brand-gold text-black px-10 py-4 text-sm uppercase tracking-widest transition-all duration-300 hover:bg-brand-gold-dark hover:text-black">
                  Discover Our Story
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Inspiration Gallery */}
        <section className="py-10 md:py-14 bg-bg-primary">
          <FadeIn>
            <div className="max-w-[1200px] mx-auto px-6 mb-16 text-center">
              <h2 className="text-4xl md:text-5xl text-brand-gold-dark font-heading font-medium mb-4 tracking-wide">#RuheeraElegance</h2>
              <p className="text-text-secondary text-lg font-light">Follow us on Instagram for daily inspiration.</p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 max-w-[1400px] mx-auto">
            <FadeIn delay={0.1}>
              <div className="aspect-square overflow-hidden rounded-lg group relative cursor-pointer shadow-sm">
                <img src="/IMG_3392.JPG" alt="Gallery Image 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-4xl font-light scale-50 group-hover:scale-100 transition-transform duration-500">♡</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="aspect-square overflow-hidden rounded-lg group relative cursor-pointer shadow-sm">
                <img src="/IMG_3397.JPG" alt="Gallery Image 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-4xl font-light scale-50 group-hover:scale-100 transition-transform duration-500">♡</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="aspect-square overflow-hidden rounded-lg group relative cursor-pointer shadow-sm">
                <img src="/IMG_0143.JPG" alt="Gallery Image 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-4xl font-light scale-50 group-hover:scale-100 transition-transform duration-500">♡</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="aspect-square overflow-hidden rounded-lg group relative cursor-pointer shadow-sm">
                <img src="/IMG_4694.JPG" alt="Gallery Image 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-4xl font-light scale-50 group-hover:scale-100 transition-transform duration-500">♡</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative py-16 md:py-20 bg-[url('/IMG_7621.JPG')] bg-cover bg-center bg-fixed text-center overflow-hidden">
          <div className="absolute inset-0 bg-black/50 transition-opacity duration-700"></div>
          <div className="relative z-10 max-w-[700px] mx-auto px-6">
            <FadeIn direction="up">
              <h2 className="font-heading text-4xl md:text-6xl mb-6 text-white font-medium tracking-wide">Join the Ruheera Family</h2>
              <p className="text-white/90 mb-10 text-lg font-light leading-relaxed">Subscribe to receive updates on new collections, exclusive offers, and jewellery care tips directly to your inbox.</p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-[500px] mx-auto">
                <input type="email" placeholder="Enter your email address" required className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-none text-white text-base outline-none font-body focus:border-white focus:bg-white/20 transition-colors placeholder:text-white/60" />
                <button type="submit" className="px-10 py-4 whitespace-nowrap bg-brand-gold-dark text-black uppercase tracking-widest font-bold transition-colors border border-brand-gold-dark hover:bg-white hover:border-white">Subscribe</button>
              </form>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
