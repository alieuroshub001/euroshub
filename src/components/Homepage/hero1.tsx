'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useMemo } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const slides = useMemo(() => [
    {
      title: "Empowering Global Innovation with",
      highlight: "Tailored Tech Solutions",
      description: "At EurosHub, we partner with businesses worldwide to build scalable, smart, and sustainable technology that transforms vision into value.",
      button1: "Let's Talk Business",
      button2: "Explore Careers",
      image: "/assets/images/hero.png",
      isVideo: false
    },
    {
      title: "Driving Digital Transformation with",
      highlight: "Cutting-Edge Technologies",
      description: "Leverage our expertise in AI, blockchain, and cloud computing to stay ahead in the digital race.",
      button1: "Discover Solutions",
      button2: "View Case Studies",
      video: "/assets/videos/hero1.mp4",
      isVideo: true
    },
    {
      title: "Building the Future with",
      highlight: "Innovative Software",
      description: "From concept to deployment, we create software solutions that redefine industries and user experiences.",
      button1: "Start Your Project",
      button2: "Our Process",
      video: "/assets/videos/hero2.mp4",
      isVideo: true
    },
    {
      title: "Your Trusted Partner for",
      highlight: "Global Tech Excellence",
      description: "With teams across continents, we deliver world-class technology services tailored to your needs.",
      button1: "Contact Us",
      button2: "Our Locations",
      video: "/assets/videos/hero3.mp4",
      isVideo: true,
      hasTextGradient: true
    }
  ], []);

  // Auto-rotate slides and handle video playback
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Handle video play/pause when slides change
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      
      if (index === currentSlide && slides[index].isVideo) {
        video.play().catch(e => console.log("Video autoplay prevented:", e));
      } else {
        video.pause();
      }
    });
  }, [currentSlide, slides]);

  return (
    <section className="relative text-[var(--foreground)] overflow-hidden h-screen min-h-[800px]">
      {/* Slides Container */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {/* Video Background (for video slides) */}
            {slide.isVideo ? (
              <div className="absolute inset-0 w-full h-full">
                <video
                  ref={el => { videoRefs.current[index] = el; }}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
                {/* Dark overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            ) : (
              <>
                {/* Image Background (for first slide) */}
                <div className="absolute inset-0 bg-[var(--background)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#a8edea] to-[#fed6e3] opacity-20" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-16 lg:px-32 flex flex-col justify-center pt-24 pb-32">
        <div className="w-full flex-grow flex flex-col justify-center">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}
            >
              <div className="grid md:grid-cols-2 items-center gap-12 relative">
                {/* Text Content with optional gradient background */}
                <div className={`${slide.isVideo ? 'text-white' : ''} relative`}>
                  {slide.hasTextGradient && (
                    <div className="absolute -inset-4 bg-gradient-to-r from-black/30 to-black/10 backdrop-blur-sm rounded-xl -z-10" />
                  )}
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                    {slide.title} <span className="text-[var(--primary)]">{slide.highlight}</span>
                  </h1>
                  <p className={`text-lg md:text-xl ${slide.isVideo ? 'text-white' : 'text-[var(--foreground)]'} opacity-80 mb-8`}>
                    {slide.description}
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <Link href="#contact">
                      <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition">
                        {slide.button1}
                      </button>
                    </Link>
                    <Link href="#careers">
                      <button className={`border ${slide.isVideo ? 'border-white text-white hover:bg-white hover:text-[var(--primary)]' : 'border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'} px-6 py-3 rounded-full font-medium transition`}>
                        {slide.button2}
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Hero Image (for first slide only) */}
                {!slide.isVideo && (
                  <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                    <Image
                      src={slide.image!}
                      alt={`Slide ${index + 1} illustration`}
                      layout="fill"
                      objectFit="contain"
                      priority={index === 0}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dots Navigation - Fixed at bottom */}
        <div className="w-full py-8 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-[var(--primary)] w-6' : 'bg-gray-400'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}