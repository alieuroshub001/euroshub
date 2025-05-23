// components/Homepage/Spacer.tsx
'use client';

import { motion } from 'framer-motion';

export default function Spacer({ variant = 'wave' }: { variant?: 'wave' | 'dots' | 'grid' | 'stripes' }) {
  // Common animation dots (used in multiple variants)
  const dots = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="relative h-32 md:h-40 w-full overflow-hidden bg-[var(--background)]">
      {variant === 'wave' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/70 opacity-10" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -bottom-20 left-0 right-0 h-40 w-[200%] animate-wave bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIzMDAiIHZpZXdCb3g9IjAgMCAxMjAwIDMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCwyMDAgQzE1MCwxMDAgMzAwLDMwMCA0NTAsMjAwIEM2MDAsMTAwIDc1MCwzMDAgOTAwLDIwMCBDMTA1MCwxMDAgMTIwMCwzMDAgMTIwMCwyMDAgTDEyMDAsMzAwIEwwLDMwMCBaIiBmaWxsPSJ2YXIoLS1wcmltYXJ5KSIvPjwvc3ZnPg==')] bg-[length:1200px_300px] opacity-20" />
          </div>
        </>
      )}

      {variant === 'dots' && (
        <>
          {dots.map((dot) => (
            <motion.div
              key={dot.id}
              className="absolute rounded-full bg-[var(--primary)] opacity-20"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 10 - 5, 0],
              }}
              transition={{
                duration: dot.duration,
                delay: dot.delay,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
            />
          ))}
        </>
      )}

      {variant === 'grid' && (
        <>
          <div className="absolute inset-0 grid grid-cols-12 gap-1 opacity-15">
            {Array.from({ length: 12 }).map((_, line) => (
              <motion.div
                key={line}
                className="h-full bg-[var(--primary)]"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: line * 0.1,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/0 via-[var(--background)]/30 to-[var(--background)]/0" />
        </>
      )}

      {variant === 'stripes' && (
        <motion.div 
          className="absolute inset-0 bg-[length:40px_40px] bg-[linear-gradient(45deg,_var(--primary)_25%,_transparent_25%,_transparent_50%,_var(--primary)_50%,_var(--primary)_75%,_transparent_75%,_transparent)] opacity-10"
          animate={{ 
            backgroundPosition: ['0 0', '40px 40px'] 
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      )}
    </div>
  );
}