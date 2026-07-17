"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Search, User, ShoppingBag, Menu, X, LogOut, LayoutDashboard, ChevronDown, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getNavigationCategories } from "@/app/actions/category";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menCategories, setMenCategories] = useState<{id: string, name: string}[]>([]);
  const [womenCategories, setWomenCategories] = useState<{id: string, name: string}[]>([]);
  const { data: session, status } = useSession();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    setIsSearchOpen(false);
    router.push(q ? `/shop?search=${encodeURIComponent(q)}` : "/shop");
  };

  useEffect(() => {
    async function fetchNav() {
      const res = await getNavigationCategories();
      if (res.success && res.categories) {
        const mCats = res.categories.filter((c: any) => 
          c.gender === 'MEN' || c.gender === 'UNISEX' || 
          c.products.some((p: any) => p.gender === 'MEN' || p.gender === 'UNISEX')
        );
        const wCats = res.categories.filter((c: any) => 
          c.gender === 'WOMEN' || c.gender === 'UNISEX' || 
          c.products.some((p: any) => p.gender === 'WOMEN' || p.gender === 'UNISEX')
        );
        setMenCategories(mCats);
        setWomenCategories(wCats);
      }
    }
    fetchNav();
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Our Story", href: "/our-story" },
    { label: "Shop", href: "/shop" },
    { label: "Men", href: "/shop?gender=MEN" },
    { label: "Women", href: "/shop?gender=WOMEN" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="bg-bg-primary/90 backdrop-blur-md border-b border-border-color h-[80px] sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-full">
        {/* Left: Logo */}
        <div className="flex items-center lg:w-[150px]">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="Ruheera" className="h-32 md:h-42 w-auto" />
          </Link>
        </div>
        
        {/* Middle: Desktop Nav Links */}
        <nav className="hidden md:flex flex-1 justify-center h-full">
          <ul className="flex gap-6 lg:gap-8 h-full items-center">
            {navLinks.map((link) => (
              <li key={link.label} className="relative group h-full flex items-center">
                <Link 
                  href={link.href} 
                  className="text-[13px] font-semibold uppercase tracking-widest text-brand-gold-dark transition-colors duration-200 hover:opacity-80 py-8 flex items-center gap-1"
                >
                  {link.label}
                  {(link.label === "Men" && menCategories.length > 0) || (link.label === "Women" && womenCategories.length > 0) ? (
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                  ) : null}
                </Link>
                
                {link.label === "Men" && menCategories.length > 0 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-[80px] w-56 bg-bg-primary border-t-2 border-brand-gold-dark shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <ul className="py-3 flex flex-col">
                      {menCategories.map(cat => (
                        <li key={cat.id}>
                          <Link href={`/shop?category=${cat.id}&gender=MEN`} className="block px-6 py-2.5 text-[13px] tracking-widest uppercase text-text-secondary hover:bg-bg-secondary hover:text-brand-gold-dark transition-colors text-center font-medium">
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {link.label === "Women" && womenCategories.length > 0 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-[80px] w-56 bg-bg-primary border-t-2 border-brand-gold-dark shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <ul className="py-3 flex flex-col">
                      {womenCategories.map(cat => (
                        <li key={cat.id}>
                          <Link href={`/shop?category=${cat.id}&gender=WOMEN`} className="block px-6 py-2.5 text-[13px] tracking-widest uppercase text-text-secondary hover:bg-bg-secondary hover:text-brand-gold-dark transition-colors text-center font-medium">
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-4 lg:gap-6 lg:w-[150px] flex-shrink-0">
          <button
            className="text-brand-gold-dark hover:opacity-80 transition-opacity"
            aria-label="Search"
            onClick={() => setIsSearchOpen((prev) => !prev)}
          >
            {isSearchOpen ? <X size={22} strokeWidth={1.5} /> : <Search size={22} strokeWidth={1.5} />}
          </button>
          {status === "authenticated" ? (
            <>
              {session?.user?.role === "ADMIN" && (
                <Link href="/admin" className="hidden sm:block text-brand-gold-dark hover:opacity-80 transition-opacity" aria-label="Admin Dashboard">
                  <LayoutDashboard size={22} strokeWidth={1.5} />
                </Link>
              )}
              <button onClick={() => signOut({ callbackUrl: "/" })} className="hidden sm:block text-brand-gold-dark hover:opacity-80 transition-opacity" aria-label="Log Out">
                <LogOut size={22} strokeWidth={1.5} />
              </button>
            </>
          ) : (
            <Link href="/login" className="hidden sm:block text-brand-gold-dark hover:opacity-80 transition-opacity" aria-label="Account">
              <User size={22} strokeWidth={1.5} />
            </Link>
          )}
          <Link href="/wishlist" className="text-brand-gold-dark hover:opacity-80 transition-opacity relative" aria-label="Wishlist">
            <Heart size={22} strokeWidth={1.5} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-black text-brand-gold-dark text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-brand-gold-dark">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="text-brand-gold-dark hover:opacity-80 transition-opacity relative" aria-label="Cart">
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="absolute -top-1.5 -right-2 bg-black text-brand-gold-dark text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-brand-gold-dark">
              {totalItems}
            </span>
          </Link>
          <button
            className="md:hidden text-brand-gold-dark hover:opacity-80 transition-opacity ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-bg-primary border-b border-border-color overflow-hidden"
          >
            <form onSubmit={handleSearchSubmit} className="max-w-[1200px] mx-auto px-6 py-5">
              <div className="flex items-center gap-3 border-b border-brand-gold-dark/40 pb-2">
                <Search size={18} className="text-brand-gold-dark" strokeWidth={1.5} />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for necklaces, rings, earrings..."
                  className="flex-1 bg-transparent outline-none text-text-primary placeholder:text-text-light text-base"
                />
                <button type="submit" className="text-xs uppercase tracking-widest text-brand-gold-dark font-bold hover:opacity-80">
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-primary border-b border-border-color overflow-hidden shadow-2xl absolute w-full"
          >
            <nav className="flex flex-col py-6 px-6 gap-6">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-border-color/50 pb-4">
                  <Link 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex justify-between items-center text-[14px] font-semibold uppercase tracking-widest text-brand-gold-dark hover:opacity-80 transition-opacity w-full"
                  >
                    {link.label}
                  </Link>
                  {link.label === "Men" && menCategories.length > 0 && (
                    <ul className="pl-4 mt-4 flex flex-col gap-3">
                      {menCategories.map(cat => (
                        <li key={cat.id}>
                          <Link href={`/shop?category=${cat.id}&gender=MEN`} onClick={() => setIsMobileMenuOpen(false)} className="text-[13px] tracking-widest uppercase text-text-secondary hover:text-brand-gold-dark font-medium transition-colors">
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {link.label === "Women" && womenCategories.length > 0 && (
                    <ul className="pl-4 mt-4 flex flex-col gap-3">
                      {womenCategories.map(cat => (
                        <li key={cat.id}>
                          <Link href={`/shop?category=${cat.id}&gender=WOMEN`} onClick={() => setIsMobileMenuOpen(false)} className="text-[13px] tracking-widest uppercase text-text-secondary hover:text-brand-gold-dark font-medium transition-colors">
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              {status === "authenticated" ? (
                <>
                  {session?.user?.role === "ADMIN" && (
                    <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 pt-4 text-brand-gold-dark font-semibold uppercase tracking-widest text-[14px] cursor-pointer hover:opacity-80 border-t border-border-color/50">
                      <LayoutDashboard size={20} strokeWidth={1.5} />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <button onClick={() => { signOut({ callbackUrl: "/" }); setIsMobileMenuOpen(false); }} className={`flex items-center gap-3 ${session?.user?.role !== "ADMIN" ? "pt-4 border-t border-border-color/50" : "pt-2"} text-brand-gold-dark font-semibold uppercase tracking-widest text-[14px] cursor-pointer hover:opacity-80 text-left`}>
                    <LogOut size={20} strokeWidth={1.5} />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 pt-4 text-brand-gold-dark font-semibold uppercase tracking-widest text-[14px] cursor-pointer hover:opacity-80 border-t border-border-color/50">
                  <User size={20} strokeWidth={1.5} />
                  <span>Account / Login</span>
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
