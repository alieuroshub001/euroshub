'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-[var(--background)] text-[var(--foreground)] pt-24 pb-32 px-6 md:px-16 lg:px-32 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* Text Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Empowering Global Innovation with <span className="text-[var(--primary)]">Tailored Tech Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--foreground)] opacity-80 mb-8">
            At EurosHub, we partner with businesses worldwide to build scalable, smart, and sustainable technology that transforms vision into value.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="#contact">
              <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition">
                Let&apos;s Talk Business
              </button>
            </Link>
            <Link href="#careers">
              <button className="border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-full font-medium hover:bg-[var(--primary)] hover:text-white transition">
                Explore Careers
              </button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
          <Image
            src="/assets/images/hero.png"
            alt="Team working illustration"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>

      {/* Subtle Decorative Gradient Background */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-br from-[#a8edea] to-[#fed6e3] opacity-20" />
    </section>
  );
}
