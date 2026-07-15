"use client";

import { signIn, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get("registered") === "true") {
      setMessage("Registration successful. Please log in.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else {
        const session = await getSession();
        if (session?.user?.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    } catch (err: any) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-bg-secondary py-12">
        <div className="bg-bg-primary p-10 shadow-xl w-full max-w-[450px] text-center border border-border-color">
          <h1 className="mb-2 font-heading text-4xl font-medium tracking-wide text-brand-gold-dark">Welcome Back</h1>
          <p className="text-text-secondary mb-10 font-light">Sign in to your account</p>
          
          {message && <div className="bg-[#e8fce8] text-[#2ac94a] p-3 mb-6 text-sm border border-[#c9ffc9]">{message}</div>}
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
                placeholder="Enter your password"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full inline-block bg-brand-gold-dark text-black font-semibold py-4 uppercase tracking-widest transition-colors duration-300 hover:bg-black hover:text-brand-gold-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-sm text-text-secondary font-light">
            Don't have an account? <Link href="/register" className="text-brand-gold-dark font-medium hover:underline">Sign Up</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
