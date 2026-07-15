"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to register");
      }

      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-bg-secondary py-12">
        <div className="bg-bg-primary p-10 shadow-xl w-full max-w-[450px] text-center border border-border-color">
          <h1 className="mb-2 font-heading text-4xl font-medium tracking-wide text-brand-gold-dark">Create Account</h1>
          <p className="text-text-secondary mb-10 font-light">Join Ruheera for a premium experience</p>
          
          {error && <div className="bg-[#fce8e8] text-[#c92a2a] p-3 mb-6 text-sm border border-[#ffc9c9]">{error}</div>}

          <form onSubmit={handleSubmit} className="text-left">
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium uppercase tracking-widest text-text-primary">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 border border-border-color font-light text-sm focus:outline-none focus:border-brand-gold-dark bg-bg-primary transition-colors"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="password" className="block mb-2 text-sm font-medium uppercase tracking-widest text-text-primary">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 border border-border-color font-light text-sm focus:outline-none focus:border-brand-gold-dark bg-bg-primary transition-colors"
                placeholder="Create a password"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full inline-block bg-brand-gold-dark text-black font-semibold py-4 uppercase tracking-widest transition-colors duration-300 hover:bg-black hover:text-brand-gold-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-sm text-text-secondary font-light">
            Already have an account? <Link href="/login" className="text-brand-gold-dark font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
