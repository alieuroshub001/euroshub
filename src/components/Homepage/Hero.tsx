// components/Global/Hero.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const Hero: FC = () => {
  return (
    <section className="relative text-[var(--foreground)] px-6 sm:px-8 md:px-16 lg:px-32 py-24">
      {/* → Content container: flex-col on mobile, two-column on md+ */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* ───────────────────────────────────────────────────────────────────── Text Content ───────────────────────────────────────────────────────────────────── */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Empowering Global Innovation with{' '}
            <span className="text-[var(--primary)]">Tailored Tech Solutions</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl opacity-80 mb-8">
            At EurosHub, we partner with businesses worldwide to build scalable, smart,
            and sustainable technology that transforms vision into value.
          </p>

          <div className="flex justify-center md:justify-start gap-4 flex-wrap">
            <Link href="/contact" passHref>
              <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition hover:shadow-lg hover:shadow-[var(--primary)]/30">
                Let’s Talk Business
              </button>
            </Link>

            <Link href="/career" passHref>
              <button className="border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-full font-medium hover:bg-[var(--primary)] hover:text-white transition hover:shadow-lg hover:shadow-[var(--primary)]/20">
                Explore Careers
              </button>
            </Link>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────────────── Hero Image ───────────────────────────────────────────────────────────────────── */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-[28rem] xl:h-[32rem]">
            <Image
              src="/assets/images/hero.png"
              alt="Team collaborating illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
