"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/users", label: "Users" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-bg-secondary">
      <aside className="w-[250px] bg-bg-primary border-r border-border-color p-6 flex flex-col">
        <div className="font-heading text-2xl font-bold mb-10 text-text-primary flex items-center gap-2">
          <span className="w-2 h-8 bg-brand-gold-dark inline-block rounded-sm"></span>
          Ruheera Admin
        </div>
        <nav className="flex-grow">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => {
              const isActive = pathname?.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-2.5 rounded text-sm font-medium tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "bg-bg-elevated text-brand-gold border-l-2 border-brand-gold"
                        : "text-text-secondary border-l-2 border-transparent hover:bg-bg-elevated hover:text-brand-gold-dark"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href="/"
                target="_blank"
                className="block px-4 py-2.5 rounded text-sm font-medium tracking-wide text-text-secondary border-l-2 border-transparent transition-colors duration-200 hover:bg-bg-elevated hover:text-brand-gold-dark"
              >
                View Store
              </a>
            </li>
          </ul>
        </nav>
        <button onClick={() => signOut()} className="mt-auto w-full inline-block bg-transparent text-text-secondary px-6 py-3 text-sm uppercase tracking-widest font-medium border border-border-color transition-all duration-200 hover:border-brand-gold-dark hover:text-brand-gold-dark rounded-sm">
          Logout
        </button>
      </aside>
      <main className="flex-grow p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
