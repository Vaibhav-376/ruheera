"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

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
        <div className="font-heading text-2xl font-bold mb-10 text-text-primary">Ruheera Admin</div>
        <nav className="flex-grow">
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/admin/products" className="block px-4 py-2.5 rounded text-text-secondary font-medium transition-colors duration-200 hover:bg-bg-accent hover:text-text-primary">
                Products
              </Link>
            </li>
            <li>
              <Link href="/admin/categories" className="block px-4 py-2.5 rounded text-text-secondary font-medium transition-colors duration-200 hover:bg-bg-accent hover:text-text-primary">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="block px-4 py-2.5 rounded text-text-secondary font-medium transition-colors duration-200 hover:bg-bg-accent hover:text-text-primary">
                Users
              </Link>
            </li>
            <li>
              <a href="/" target="_blank" className="block px-4 py-2.5 rounded text-text-secondary font-medium transition-colors duration-200 hover:bg-bg-accent hover:text-text-primary">
                View Store
              </a>
            </li>
          </ul>
        </nav>
        <button onClick={() => signOut()} className="mt-auto w-full inline-block bg-transparent text-text-primary px-6 py-3 text-sm uppercase tracking-wide border border-text-primary transition-all duration-200 hover:bg-text-primary hover:text-bg-primary">
          Logout
        </button>
      </aside>
      <main className="flex-grow p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
