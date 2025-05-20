'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';

const teamMembers = [
  {
    name: 'Sheikh Nabeel',
    role: 'Founder, CEO',
    image: '/assets/team1/Sheikh Nabeel (CEO & Founder).png',
  },
  {
    name: 'Muhammad Awais',
    role: 'Co-Founder, CTO',
    image: '/assets/team1/Muhammad Awais (Co-Founder).png',
  },
  {
    name: 'Saira Ali',
    role: 'Managing Director',
    image: '/assets/team1/Saira Ali (Managing Director).png',
  },
  {
    name: 'Humayoun Mussawar',
    role: 'Marketing Head',
    image: '/assets/team1/Humayoun Mussawar (Marketing Head).png',
  },
  {
    name: 'Jawaria Maqbool',
    role: 'Project Manager',
    image: '/assets/team1/Jawaria Maqbool (Project Manager).png',
  },
  {
    name: 'Hamza Badar',
    role: 'Acting Team Lead',
    image: '/assets/team1/Hamza Badar (Acting Team Lead).png',
  },
   {
    name: 'Sheikh Nabeel',
    role: 'Founder, CEO',
    image: '/assets/team1/Sheikh Nabeel (CEO & Founder).png',
  },
  {
    name: 'Muhammad Awais',
    role: 'Co-Founder, CTO',
    image: '/assets/team1/Muhammad Awais (Co-Founder).png',
  },
  {
    name: 'Saira Ali',
    role: 'Managing Director',
    image: '/assets/team1/Saira Ali (Managing Director).png',
  },
  {
    name: 'Humayoun Mussawar',
    role: 'Marketing Head',
    image: '/assets/team1/Humayoun Mussawar (Marketing Head).png',
  },
  {
    name: 'Jawaria Maqbool',
    role: 'Project Manager',
    image: '/assets/team1/Jawaria Maqbool (Project Manager).png',
  },
  {
    name: 'Hamza Badar',
    role: 'Acting Team Lead',
    image: '/assets/team1/Hamza Badar (Acting Team Lead).png',
  },
];

export default function Team() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag to scroll functionality
  useEffect(() => {
    const slider = scrollRef.current;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - slider!.offsetLeft;
      scrollLeft = slider!.scrollLeft;
      slider!.classList.add('active');
    };

    const onMouseLeave = () => {
      isDown = false;
      slider!.classList.remove('active');
    };

    const onMouseUp = () => {
      isDown = false;
      slider!.classList.remove('active');
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider!.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed
      slider!.scrollLeft = scrollLeft - walk;
    };

    slider?.addEventListener('mousedown', onMouseDown);
    slider?.addEventListener('mouseleave', onMouseLeave);
    slider?.addEventListener('mouseup', onMouseUp);
    slider?.addEventListener('mousemove', onMouseMove);

    return () => {
      slider?.removeEventListener('mousedown', onMouseDown);
      slider?.removeEventListener('mouseleave', onMouseLeave);
      slider?.removeEventListener('mouseup', onMouseUp);
      slider?.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section className="py-12 px-6">
      <h2 className="text-4xl font-bold text-center mb-10">Our Experienced Team</h2>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 px-4 scroll-smooth cursor-grab no-scrollbar"
      >
        {teamMembers.map((member, idx) => (
          <div key={idx} className="min-w-[250px] flex-shrink-0 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-[220px] h-[220px] rounded-xl overflow-hidden bg-[var(--card-bg)] image-card flex items-center justify-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={220}
                  height={220}
                  className="object-cover w-full h-full object-top"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold">
              {member.name.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-[var(--primary)]">
                {member.name.split(' ').slice(-1)}
              </span>
            </h3>
            <p className="text-sm mt-1">{member.role}</p>
            <div className="mt-2 flex justify-center">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--primary)]"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
