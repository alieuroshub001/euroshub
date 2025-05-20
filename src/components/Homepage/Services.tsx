'use client';

import { BriefcaseIcon, CodeIcon, GlobeIcon, SparklesIcon } from 'lucide-react';

const services = [
  {
    title: 'Custom Software Development',
    icon: <CodeIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Tailored applications built to streamline your operations and boost performance across platforms.',
  },
  {
    title: 'Digital Transformation',
    icon: <GlobeIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'We help organizations modernize legacy systems and embrace scalable, digital-first strategies.',
  },
  {
    title: 'Technology Consulting',
    icon: <BriefcaseIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'From idea to execution, our experts guide you in making smart tech choices for sustained growth.',
  },
  {
    title: 'UI/UX & Product Design',
    icon: <SparklesIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Create engaging and intuitive user experiences that turn visitors into loyal customers.',
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-[var(--secondary)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          What We Do
        </h2>
        <p className="text-lg md:text-xl opacity-80 mb-12">
          We offer a suite of strategic, creative, and technical services to turn your vision into real-world results.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[var(--card-bg)] p-8 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-[var(--foreground)] opacity-70">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
