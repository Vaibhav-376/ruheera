"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { submitLead } from "@/app/actions/contact";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    
    const result = await submitLead(formData);
    
    if (result.success) {
      setStatus("success");
      setMessage("Thank you for reaching out. A member of our concierge team will contact you shortly.");
      formRef.current.reset();
    } else {
      setStatus("error");
      setMessage(result.error || "An error occurred. Please try again.");
    }
  }

  return (
    <>
      <Header />
      <main className="bg-bg-primary pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Page Header */}
        <div className="max-w-[1200px] mx-auto px-6 mb-16 md:mb-24 text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-6xl text-brand-gold-dark font-heading font-medium tracking-wide mb-6">
              Contact Us
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto font-light leading-relaxed">
              We invite you to reach out to our dedicated concierge team for inquiries regarding our collections, bespoke pieces, or appointments.
            </p>
          </FadeIn>
        </div>

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Contact Information */}
            <div className="space-y-12">
              <FadeIn delay={0.1}>
                <h2 className="text-3xl font-heading text-text-primary mb-8 tracking-wide">
                  Get in Touch
                </h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-brand-gold-dark/30 flex items-center justify-center shrink-0 text-brand-gold-dark group-hover:bg-brand-gold-dark group-hover:text-black transition-all duration-300">
                      <Phone size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-text-primary mb-2">Phone</h3>
                      <p className="text-text-secondary font-light leading-relaxed">
                        +91 22 1234 5678<br />
                        +91 98765 43210
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-full border border-brand-gold-dark/30 flex items-center justify-center shrink-0 text-brand-gold-dark group-hover:bg-brand-gold-dark group-hover:text-black transition-all duration-300">
                      <Mail size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-text-primary mb-2">Email</h3>
                      <p className="text-text-secondary font-light leading-relaxed">
                        concierge@ruheera.com<br />
                        info@ruheera.com
                      </p>
                    </div>
                  </div>

                </div>
              </FadeIn>
            </div>

            {/* Lead Form */}
            <div className="bg-bg-secondary p-8 md:p-12 rounded-xl border border-border-color shadow-sm">
              <FadeIn delay={0.2}>
                <h2 className="text-3xl font-heading text-text-primary mb-2 tracking-wide">
                  Send a Message
                </h2>
                <p className="text-text-secondary font-light mb-8">
                  Fill out the form below and we will contact you shortly.
                </p>

                {status === "success" && (
                  <div className="mb-8 p-4 bg-green-50/50 border border-green-200 text-green-800 rounded-lg text-sm font-light">
                    {message}
                  </div>
                )}
                
                {status === "error" && (
                  <div className="mb-8 p-4 bg-red-50/50 border border-red-200 text-red-800 rounded-lg text-sm font-light">
                    {message}
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-text-primary mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      className="w-full px-4 py-3 bg-transparent border-b border-border-color focus:border-brand-gold-dark outline-none transition-colors font-light"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-text-primary mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        className="w-full px-4 py-3 bg-transparent border-b border-border-color focus:border-brand-gold-dark outline-none transition-colors font-light"
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-text-primary mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        className="w-full px-4 py-3 bg-transparent border-b border-border-color focus:border-brand-gold-dark outline-none transition-colors font-light"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-text-primary mb-2">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={5}
                      className="w-full px-4 py-3 bg-transparent border-b border-border-color focus:border-brand-gold-dark outline-none transition-colors font-light resize-none"
                      placeholder="How can we assist you?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-3 bg-brand-gold-dark text-black px-8 py-4 uppercase tracking-widest font-bold transition-all duration-300 hover:bg-black hover:text-brand-gold-dark disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                  >
                    {status === "loading" ? "Sending..." : "Submit Inquiry"}
                    {status !== "loading" && <Send size={16} />}
                  </button>
                </form>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
