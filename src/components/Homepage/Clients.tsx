'use client';
import Image from 'next/image';
import React from 'react';
import Marquee from './ClientMarquee';

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

const ClientLogo = ({ logo }: { logo: string }) => {
  return (
    <div className="flex-shrink-0 px-6">
      <div className="p-4 rounded-lg">
        <Image
          src={`/assets/clients/${logo}`}
          alt={`Client Logo`}
          width={200}
          height={100}
          className="object-contain h-24 w-auto transition-transform duration-300 [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.3))]"
        />
      </div>
    </div>
  );
};

export default function Clients() {
  // Create 3 copies of the logos array for smoother animation
  const extendedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="mt-20 relative py-0 text-[var(--foreground)] w-full bg-transparent">
      <div className="w-full mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-26"> {/* Increased margin-bottom from mb-12 to mb-16 */}
          Trusted by Global Brands
        </h2>

        {/* First marquee with margin-bottom */}
        <div className="mb-10"> {/* Added margin-bottom */}
          <Marquee direction="left" speed={30}>
            {extendedLogos.map((logo, index) => (
              <ClientLogo key={`left-${index}`} logo={logo} />
            ))}
          </Marquee>
        </div>

        {/* Second marquee moving in opposite direction */}
        <Marquee direction="right" speed={25}>
          {extendedLogos.map((logo, index) => (
            <ClientLogo key={`right-${index}`} logo={logo} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}