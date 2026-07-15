import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";

export const metadata = {
  title: 'Our Story | Ruheera',
  description: 'Learn about the heritage, craftsmanship, and vision behind Ruheera jewellery.',
};

export default function OurStoryPage() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{ backgroundImage: "url('/IMG_3154.JPG')" }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 max-w-[800px] mx-auto px-6 text-white">
            <FadeIn>
              <h1 className="text-6xl md:text-8xl mb-6 font-heading font-medium tracking-wide">Our Story</h1>
              <p className="text-xl md:text-2xl font-light tracking-widest uppercase opacity-90">
                A legacy of elegance, crafted for eternity.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Content Section 1 */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1">
              <FadeIn direction="right">
                <h2 className="text-4xl md:text-5xl text-brand-gold-dark font-heading font-medium mb-10 tracking-wide">The Genesis of Ruheera</h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-8 font-light">
                  Ruheera was born out of a profound appreciation for the artistry that goes into creating fine jewellery. We believe that every piece of jewellery is more than just an accessory; it is a bearer of memories, a symbol of love, and a testament to individuality.
                </p>
                <p className="text-text-secondary text-lg leading-relaxed font-light">
                  Our founders started with a simple vision: to bring together the world's finest diamonds, the purest gold, and the most skilled artisans to create collections that speak directly to the soul. Today, Ruheera stands as a beacon of luxury and trust in the world of fine jewellery.
                </p>
              </FadeIn>
            </div>
            <div className="flex-1 w-full relative">
              <FadeIn direction="left" delay={0.2}>
                <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-2xl">
                  <img src="/IMG_9113.JPG" alt="Craftsmanship detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Highlight Quote */}
        <section className="py-16 md:py-24 bg-bg-secondary text-center px-6 border-y border-border-color">
          <div className="max-w-[900px] mx-auto">
            <FadeIn direction="up">
              <span className="text-brand-gold-dark text-6xl block mb-8 font-heading">❝</span>
              <h3 className="text-3xl md:text-4xl font-heading font-medium text-text-primary leading-relaxed mb-10 tracking-wide">
                "True luxury lies in the details. It is the invisible hours of dedication that give our jewellery its unmistakable soul."
              </h3>
              <p className="text-brand-gold-dark uppercase tracking-[0.3em] text-sm font-bold">The Founders</p>
            </FadeIn>
          </div>
        </section>

        {/* Content Section 2 */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-20">
            <div className="flex-1 w-full relative">
              <FadeIn direction="right" delay={0.2}>
                <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-2xl">
                  <img src="/IMG_9121.JPG" alt="Jewellery design process" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                </div>
              </FadeIn>
            </div>
            <div className="flex-1">
              <FadeIn direction="left">
                <h2 className="text-4xl md:text-5xl text-brand-gold-dark font-heading font-medium mb-10 tracking-wide">Master Craftsmanship</h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-8 font-light">
                  At the heart of Ruheera is an uncompromising commitment to craftsmanship. Our ateliers are home to master jewelers who have spent decades perfecting their craft. Using a harmonious blend of traditional techniques passed down through generations and cutting-edge modern precision, they bring our designs to life.
                </p>
                <p className="text-text-secondary text-lg leading-relaxed mb-12 font-light">
                  From the initial sketch to the final polish, every step of the creation process is executed with meticulous care. We source our gemstones ethically and inspect every diamond by hand to ensure it meets our rigorous standards for brilliance and clarity.
                </p>
                <Link href="/shop" className="inline-block bg-transparent text-text-primary border border-text-primary px-10 py-4 text-sm uppercase tracking-widest transition-all hover:bg-black hover:text-white hover:border-black">
                  Explore Our Craft
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-bg-primary border-t border-border-color">
          <div className="max-w-[800px] mx-auto px-6">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl text-center text-brand-gold-dark font-heading font-medium mb-16 tracking-wide">Frequently Asked Questions</h2>
            </FadeIn>
            <div className="space-y-8">
              {[
                {
                  q: "Are your diamonds ethically sourced?",
                  a: "Yes, we are committed to conflict-free sourcing. All our diamonds and precious gemstones are ethically sourced from trusted suppliers who adhere to the Kimberley Process."
                },
                {
                  q: "Do you offer international shipping?",
                  a: "We offer secure, insured global shipping to most countries. Every package is fully insured from our door to yours."
                },
                {
                  q: "Can I request a custom design?",
                  a: "Absolutely. Our master artisans specialize in bringing your unique vision to life. You can contact our bespoke design team for a consultation."
                },
                {
                  q: "What is your warranty policy?",
                  a: "We stand by our craftsmanship with a comprehensive lifetime warranty against manufacturing defects on all fine jewellery."
                }
              ].map((faq, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="border-b border-border-color pb-8 last:border-0">
                    <h3 className="font-heading text-2xl font-medium text-text-primary mb-4 tracking-wide">{faq.q}</h3>
                    <p className="text-text-secondary text-lg font-light leading-relaxed">{faq.a}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
