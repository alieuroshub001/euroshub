'use client';

import Image from 'next/image';
import Marquee from 'react-fast-marquee';

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

const ClientLogo = ({ logo }: { logo: string }) => (
  <div className="flex-shrink-0 px-4 sm:px-6">
    <div className="flex items-center justify-center p-4 rounded-lg bg-[var(--card-bg)]/10">
      <Image
        src={`/assets/clients/${logo}`}
        alt="Client Logo"
        width={200}
        height={100}
        className="object-contain h-20 sm:h-24 w-auto transition-transform duration-300 hover:scale-105 [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.3))]"
      />
    </div>
  </div>
);

function shuffle(array: string[]): string[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[i], result[j]];
  }
  return result;
}

export default function Clients() {
  const topLogos1 = shuffle(logos);
  const topLogos2 = shuffle(logos);
  const bottomLogos1 = shuffle(logos);
  const bottomLogos2 = shuffle(logos);

  return (
    <section className="py-20 px-0 text-[var(--foreground)] bg-transparent">
      <div className="w-screen overflow-hidden">
        {/* Top-left marquee */}
        <div className="mb-6">
          <Marquee direction="left" speed={35} gradient={false}>
            {topLogos1.map((logo, idx) => (
              <ClientLogo key={`top-left-${idx}`} logo={logo} />
            ))}
          </Marquee>
        </div>

        {/* Top-right marquee */}
        <div className="mb-12">
          <Marquee direction="right" speed={30} gradient={false}>
            {topLogos2.map((logo, idx) => (
              <ClientLogo key={`top-right-${idx}`} logo={logo} />
            ))}
          </Marquee>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Trusted by Global Brands
        </h2>

        {/* Bottom-left marquee */}
        <div className="mb-6">
          <Marquee direction="left" speed={30} gradient={false}>
            {bottomLogos1.map((logo, idx) => (
              <ClientLogo key={`bottom-left-${idx}`} logo={logo} />
            ))}
          </Marquee>
        </div>

        {/* Bottom-right marquee */}
        <div>
          <Marquee direction="right" speed={25} gradient={false}>
            {bottomLogos2.map((logo, idx) => (
              <ClientLogo key={`bottom-right-${idx}`} logo={logo} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
