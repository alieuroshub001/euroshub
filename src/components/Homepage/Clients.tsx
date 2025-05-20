'use client';

import Image from 'next/image';
import React from 'react';

const logos = [
  'BH.png',
  'Bucksaw.png',
  'InData.png',
  'Jimmy.png',
  'Mastery Learning.png',
  'Miss Meno.png',
  'motiV8.png',
  'My math experts.png',
  'My speaking score.png',
  'North Data.png',
  'Proventas.png',
  'Sheffield.png',
  'Sisters Helping Seniors.png',
  'SW.png',
  'Zuri bella.png',
];

export default function Clients() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#a8edea] to-[#fed6e3]">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--foreground)] mb-10">
        Trusted by Global Brands
      </h2>

      <div className="overflow-hidden relative space-y-12">
        {/* Top Marquee - LTR */}
        <div className="flex animate-marquee space-x-20 w-max">
          {[...logos, ...logos].map((logo, i) => (
            <Image
              key={`top-${i}`}
              src={`/assets/clients/${logo}`}
              alt={`Client Logo ${i}`}
              width={160}
              height={80}
              className="object-contain h-24 w-auto transition duration-300"
            />
          ))}
        </div>

        {/* Bottom Marquee - RTL */}
        <div className="flex animate-marquee-reverse space-x-20 w-max">
          {[...logos, ...logos].map((logo, i) => (
            <Image
              key={`bottom-${i}`}
              src={`/assets/clients/${logo}`}
              alt={`Client Logo ${i}`}
              width={160}
              height={80}
              className="object-contain h-24 w-auto transition duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
