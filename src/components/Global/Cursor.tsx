'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface CursorProps {
  mousePos: { x: number; y: number };
  isDragging: boolean;
  isDarkMode?: boolean;
  showCursor: boolean;
}

const parseRGB = (rgbString: string): number[] | null => {
  const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : null;
};

const getLuminance = ([r, g, b]: number[]): number =>
  (0.299 * r + 0.587 * g + 0.114 * b) / 255;

export default function Cursor({ mousePos, isDragging, showCursor, isDarkMode }: CursorProps) {
  const [mounted, setMounted] = useState(false);
  const [dynamicColor, setDynamicColor] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'display: none; position: absolute; top: -9999px;';
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    return () => {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      canvasRef.current = null;
    };
  }, []);

  const getImageColorAtPoint = (img: HTMLImageElement, x: number, y: number): string | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    const rect = img.getBoundingClientRect();
    canvas.width = img.naturalWidth || rect.width;
    canvas.height = img.naturalHeight || rect.height;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const relX = ((x - rect.left) / rect.width) * canvas.width;
    const relY = ((y - rect.top) / rect.height) * canvas.height;

    const clampedX = Math.min(Math.max(0, Math.floor(relX)), canvas.width - 1);
    const clampedY = Math.min(Math.max(0, Math.floor(relY)), canvas.height - 1);

    const sampleSize = 3;
    const imageData = ctx.getImageData(
      Math.max(0, clampedX - sampleSize),
      Math.max(0, clampedY - sampleSize),
      Math.min(sampleSize * 2 + 1, canvas.width),
      Math.min(sampleSize * 2 + 1, canvas.height)
    );

    const data = imageData.data;
    let r = 0, g = 0, b = 0, count = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }

    if (count === 0) return null;
    const luminance = getLuminance([r / count, g / count, b / count]);
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  const getBackgroundImageColor = (el: Element, x: number, y: number): Promise<string | null> => {
    const bgImage = window.getComputedStyle(el).backgroundImage;
    const match = bgImage.match(/url\(['"]?([^'"]*)['"]?\)/);
    if (!match) return Promise.resolve(null);

    const tempImg = new Image();
    tempImg.crossOrigin = 'anonymous';

    return new Promise((resolve) => {
      tempImg.onload = () => resolve(getImageColorAtPoint(tempImg, x, y));
      tempImg.onerror = () => resolve(null);
      tempImg.src = match[1];
    });
  };

  const getContrastingColor = async (x: number, y: number): Promise<string> => {
    const el = document.elementFromPoint(x, y);
    if (!el) return '';

    const styles = window.getComputedStyle(el);
    const bgImage = styles.backgroundImage;

    if (el.tagName === 'IMG') {
      const img = el as HTMLImageElement;
      if (img.complete && img.naturalWidth > 0) {
        const color = getImageColorAtPoint(img, x, y);
        if (color) return color;
      }
    }

    if (bgImage && bgImage !== 'none') {
      const color = await getBackgroundImageColor(el, x, y);
      if (color) return color;

      if (bgImage.toLowerCase().includes('dark')) return '#ffffff';
      if (bgImage.toLowerCase().includes('light')) return '#000000';
      return '#17b6b2'; // fallback
    }

    const rgb = parseRGB(styles.backgroundColor || styles.color || '');
    if (rgb) {
      return getLuminance(rgb) > 0.5 ? '#000000' : '#ffffff';
    }

    const tag = el.tagName.toLowerCase();
    const classList = Array.from(el.classList);
    if (['button', 'a', 'input'].includes(tag) || classList.some(c => /button|link/.test(c))) {
      return '#17b6b2';
    }

    return isDarkMode ? '#ffffff' : '#000000';
  };

  useEffect(() => {
    if (!mounted) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(async () => {
      const color = await getContrastingColor(mousePos.x, mousePos.y);
      if (color !== dynamicColor) {
        setDynamicColor(color);
      }
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mousePos.x, mousePos.y, mounted]);

  if (!mounted) return null;

  const size = isDragging ? 42 : 48;
  const offset = size / 2;
  const chevronOffset = isDragging ? '-24px' : '-26px';
  const chevronSize = isDragging ? 14 : 16;
  const glowSize = isDragging ? '10px' : '12px';

  const finalColor = dynamicColor || (isDarkMode ? 'var(--primary-light)' : 'var(--primary-dark)');

  return (
    <motion.div
      className="fixed pointer-events-none z-50 rounded-full border-2 transition-all duration-200 ease-out"
      style={{
        top: mousePos.y - offset,
        left: mousePos.x - offset,
        width: size,
        height: size,
        borderColor: finalColor,
        backgroundColor: 'transparent',
        borderWidth: isDragging ? '3px' : '2px',
        willChange: 'transform',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: showCursor ? 1 : 0, width: size, height: size }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <ChevronLeft
        className="absolute top-1/2 -translate-y-1/2 transition-all duration-200"
        style={{ left: chevronOffset, color: finalColor }}
        size={chevronSize}
      />
      <ChevronRight
        className="absolute top-1/2 -translate-y-1/2 transition-all duration-200"
        style={{ right: chevronOffset, color: finalColor }}
        size={chevronSize}
      />
      <div
        className="absolute inset-0 rounded-full opacity-30 transition-all duration-200"
        style={{ boxShadow: `0 0 ${glowSize} ${finalColor}` }}
      />
    </motion.div>
  );
}
