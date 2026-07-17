import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-color pt-16 mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between flex-wrap gap-10 pb-10">
        <div className="flex-1 min-w-[250px]">
          <h3 className="font-heading text-2xl mb-4 text-brand-gold-dark">Ruheera</h3>
          <p className="text-text-secondary leading-relaxed">
            Timeless, handcrafted jewellery for every story you wear.
          </p>
        </div>
        <div className="flex-1 min-w-[250px]">
          <h4 className="text-base mb-5 uppercase tracking-wide">Quick Links</h4>
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/" className="text-text-secondary transition-colors duration-200 hover:text-brand-gold-dark">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="text-text-secondary transition-colors duration-200 hover:text-brand-gold-dark">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/our-story" className="text-text-secondary transition-colors duration-200 hover:text-brand-gold-dark">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="text-text-secondary transition-colors duration-200 hover:text-brand-gold-dark">
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="/cart" className="text-text-secondary transition-colors duration-200 hover:text-brand-gold-dark">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-text-secondary transition-colors duration-200 hover:text-brand-gold-dark">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 min-w-[250px]">
          <h4 className="text-base mb-5 uppercase tracking-wide">Customer Service</h4>
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="#" className="text-text-secondary transition-colors duration-200 hover:text-brand-gold-dark">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#" className="text-text-secondary transition-colors duration-200 hover:text-brand-gold-dark">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="#" className="text-text-secondary transition-colors duration-200 hover:text-brand-gold-dark">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="#" className="text-text-secondary transition-colors duration-200 hover:text-brand-gold-dark">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center py-6 border-t border-white/10 text-text-light text-sm">
        <p>&copy; {new Date().getFullYear()} Ruheera. All rights reserved.</p>
      </div>
    </footer>
  );
}
