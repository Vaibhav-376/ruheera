"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Search, User, ShoppingBag, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Our Story", href: "/our-story" },
    { label: "Shop", href: "/shop" },
    { label: "Men", href: "/men" },
    { label: "Women", href: "/women" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-border-color h-[80px] sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-full">
        {/* Left: Logo */}
        <div className="flex items-center lg:w-[150px]">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="Ruheera" className="h-32 md:h-42 w-auto" />
          </Link>
        </div>
        
        {/* Middle: Desktop Nav Links */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link 
                  href={link.href} 
                  className="text-[13px] font-semibold uppercase tracking-widest text-brand-gold-dark transition-colors duration-200 hover:opacity-80"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-4 lg:gap-6 lg:w-[150px] flex-shrink-0">
          <button className="text-brand-gold-dark hover:opacity-80 transition-opacity" aria-label="Search">
            <Search size={22} strokeWidth={1.5} />
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
          <button className="text-brand-gold-dark hover:opacity-80 transition-opacity relative" aria-label="Cart">
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="absolute -top-1.5 -right-2 bg-black text-brand-gold-dark text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-brand-gold-dark">
              0
            </span>
          </button>
          <button 
            className="md:hidden text-brand-gold-dark hover:opacity-80 transition-opacity ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border-color overflow-hidden shadow-2xl absolute w-full"
          >
            <nav className="flex flex-col py-6 px-6 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[14px] font-semibold uppercase tracking-widest text-brand-gold-dark border-b border-border-color/50 pb-4 hover:opacity-80 transition-opacity"
                >
                  {link.label}
                </Link>
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
