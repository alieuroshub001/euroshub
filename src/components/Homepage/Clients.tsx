'use client';

import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { useState } from 'react';

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

// Split into two arrays
const mid = Math.ceil(logos.length / 2);
const firstArray = logos.slice(0, mid);
const secondArray = logos.slice(mid);

// Rotate utility
const rotateArray = (arr: string[], start: number) => {
  return [...arr.slice(start), ...arr.slice(0, start)];
};

const ClientLogo = ({
  logo,
  setPaused,
}: {
  logo: string;
  setPaused: (pause: boolean) => void;
}) => (
  <div
    className="flex-shrink-0 px-4 sm:px-6"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
  >
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

export default function Clients() {
  const [paused1, setPaused1] = useState(false);
  const [paused2, setPaused2] = useState(false);
  const [paused3, setPaused3] = useState(false);
  const [paused4, setPaused4] = useState(false);

  return (
    <section className="py-20 text-[var(--foreground)] clients-gradient-bg">
      <div className="w-full overflow-hidden space-y-10">

        {/* Marquee 1: First Array (start at 0) - Direction inverted to right */}
        <Marquee direction="right" speed={35} gradient={false} play={!paused1}>
          {[...firstArray, ...firstArray].map((logo, idx) => (
            <ClientLogo key={`marquee1-${idx}`} logo={logo} setPaused={setPaused1} />
          ))}
        </Marquee>

        {/* Marquee 2: Second Array (start at 0) - Direction inverted to left */}
        <Marquee direction="left" speed={30} gradient={false} play={!paused2}>
          {[...secondArray, ...secondArray].map((logo, idx) => (
            <ClientLogo key={`marquee2-${idx}`} logo={logo} setPaused={setPaused2} />
          ))}
        </Marquee>
      </div>

        {/* Heading */}
        <div className="space-y-5 mt-30 mb-30 text-3xl md:text-4xl font-bold text-center">
          Trusted by Global Brands
      </div>


      <div className="w-full overflow-hidden space-y-10">
        {/* Marquee 3: First Array (start from middle = opposite of 0) - Direction inverted to right */}
        <Marquee direction="right" speed={30} gradient={false} play={!paused3}>
          {[...rotateArray(firstArray, Math.floor(firstArray.length / 2)), ...rotateArray(firstArray, Math.floor(firstArray.length / 2))].map((logo, idx) => (
            <ClientLogo key={`marquee3-${idx}`} logo={logo} setPaused={setPaused3} />
          ))}
        </Marquee>

        {/* Marquee 4: Second Array (start from middle = opposite of 0) - Direction inverted to left */}
        <Marquee direction="left" speed={25} gradient={false} play={!paused4}>
          {[...rotateArray(secondArray, Math.floor(secondArray.length / 2)), ...rotateArray(secondArray, Math.floor(secondArray.length / 2))].map((logo, idx) => (
            <ClientLogo key={`marquee4-${idx}`} logo={logo} setPaused={setPaused4} />
          ))}
        </Marquee>

      </div>
    </section>
  );
}