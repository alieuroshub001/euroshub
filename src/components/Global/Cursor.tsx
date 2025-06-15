'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';

interface CursorProps {
  mousePos: { x: number; y: number };
  isDragging: boolean;
  showCursor: boolean;
}

const parseRGB = (rgbString: string): number[] | null => {
  const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : null;
};

const getLuminance = ([r, g, b]: number[]): number =>
  (0.299 * r + 0.587 * g + 0.114 * b) / 255;

export default function Cursor({ mousePos, isDragging, showCursor }: CursorProps) {
  const [mounted, setMounted] = useState(false);
  const [dynamicColor, setDynamicColor] = useState<string>('#17b6b2');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const canvas = document.createElement('canvas');
    canvas.style.display = 'none';
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    return () => {
      document.body.removeChild(canvas);
      canvasRef.current = null;
    };
  }, []);

  const getImageColorAtPoint = useCallback((img: HTMLImageElement, x: number, y: number): string | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    const rect = img.getBoundingClientRect();
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    const relX = (x - rect.left) * scaleX;
    const relY = (y - rect.top) * scaleY;

    const clampedX = Math.floor(Math.min(Math.max(0, relX), canvas.width - 1));
    const clampedY = Math.floor(Math.min(Math.max(0, relY), canvas.height - 1));

    const pixel = ctx.getImageData(clampedX, clampedY, 1, 1).data;
    const luminance = getLuminance([pixel[0], pixel[1], pixel[2]]);

    return luminance > 0.5 ? '#000000' : '#ffffff';
  }, []);

  const getContrastingColor = useCallback(async (x: number, y: number): Promise<string> => {
    const el = document.elementFromPoint(x, y);
    if (!el) return '#17b6b2';

    const styles = window.getComputedStyle(el);

    if (el.tagName === 'IMG') {
      const img = el as HTMLImageElement;
      if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
        const color = getImageColorAtPoint(img, x, y);
        if (color) return color;
      }
    }

    const bgRGB = parseRGB(styles.backgroundColor || '');
    if (bgRGB) {
      const luminance = getLuminance(bgRGB);
      return luminance > 0.5 ? '#000000' : '#ffffff';
    }

    return '#17b6b2';
  }, [getImageColorAtPoint]);

  useEffect(() => {
    if (!mounted) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(async () => {
      const color = await getContrastingColor(mousePos.x, mousePos.y);
      const safeColors = ['#ffffff', '#000000', '#17b6b2', '#063a53'];
      const finalColor = safeColors.includes(color) ? color : '#17b6b2';
      if (finalColor !== dynamicColor) {
        setDynamicColor(finalColor);
      }
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mousePos, mounted, getContrastingColor, dynamicColor]);

  if (!mounted) return null;

  const size = isDragging ? 48 : 56;
  const borderWidth = isDragging ? 4 : 6;
  const offset = size / 2;
  const chevronOffset = isDragging ? '-26px' : '-30px';
  const chevronSize = isDragging ? 16 : 18;
  const useBlend = ['#ffffff', '#000000'].includes(dynamicColor);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 flex items-center justify-center"
      style={{
        top: mousePos.y - offset,
        left: mousePos.x - offset,
        width: size,
        height: size,
        borderRadius: '50%',
        border: `${borderWidth}px solid ${dynamicColor}`,
        backgroundColor: 'transparent',
        boxShadow: `0 0 6px ${dynamicColor}`,
        mixBlendMode: useBlend ? 'difference' : 'normal',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: showCursor ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <ChevronLeft
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: chevronOffset, color: dynamicColor }}
        size={chevronSize}
      />
      <ChevronRight
        className="absolute top-1/2 -translate-y-1/2"
        style={{ right: chevronOffset, color: dynamicColor }}
        size={chevronSize}
      />
    </motion.div>
  );
}
