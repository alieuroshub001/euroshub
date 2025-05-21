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
    <section className="py-16 bg-[var(--background)] text-[var(--foreground)] w-full">
      <div className="w-full mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Trusted by Global Brands
        </h2>

        <div className="relative overflow-hidden w-full bg-[var(--secondary)]/20 dark:bg-transparent rounded-xl">
          {/* First Marquee */}
          <div className="flex animate-marquee whitespace-nowrap items-center py-8 w-max">
            {[...logos, ...logos].map((logo, i) => (
              <div 
                key={`top-${i}`}
                className="mx-10 flex-shrink-0"
              >
                <div className="p-4 rounded-lg">
                  <Image
                    src={`/assets/clients/${logo}`}
                    alt={`Client Logo ${i}`}
                    width={200}
                    height={100}
                    className={`
                      object-contain h-24 w-auto 
                      hover:scale-110 transition-transform duration-300
                      dark:drop-shadow-none
                      [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.3))_drop-shadow(0_0_1px_rgba(0,0,0,0.3))]
                    `}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Second Marquee - Offset */}
          <div className="flex animate-marquee-reverse whitespace-nowrap items-center py-8 w-max">
            {[...logos, ...logos].map((logo, i) => (
              <div 
                key={`bottom-${i}`}
                className="mx-10 flex-shrink-0"
              >
                <div className="p-4 rounded-lg">
                  <Image
                    src={`/assets/clients/${logo}`}
                    alt={`Client Logo ${i}`}
                    width={200}
                    height={100}
                    className={`
                      object-contain h-24 w-auto 
                      hover:scale-110 transition-transform duration-300
                      dark:drop-shadow-none
                      [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.3))_drop-shadow(0_0_1px_rgba(0,0,0,0.3))]
                    `}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 35s linear infinite;
        }
      `}</style>
    </section>
  );
}