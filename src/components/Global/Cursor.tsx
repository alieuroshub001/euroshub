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

  const getImageColorAtPoint = useCallback((img: HTMLImageElement, x: number, y: number): string | null => {
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

    const clampedX = Math.floor(Math.min(Math.max(0, relX), canvas.width - 1));
    const clampedY = Math.floor(Math.min(Math.max(0, relY), canvas.height - 1));

    const imageData = ctx.getImageData(clampedX, clampedY, 1, 1).data;
    const luminance = getLuminance([imageData[0], imageData[1], imageData[2]]);
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }, []);

  const getContrastingColor = useCallback(async (x: number, y: number): Promise<string> => {
    const el = document.elementFromPoint(x, y);
    if (!el) return '#17b6b2';

    const styles = window.getComputedStyle(el);

    if (el.tagName === 'IMG') {
      const img = el as HTMLImageElement;
      if (img.complete && img.naturalWidth > 0) {
        const color = getImageColorAtPoint(img, x, y);
        if (color === '#ffffff' || color === '#000000') return color;
      }
    }

    const rgb = parseRGB(styles.backgroundColor || styles.color || '');
    if (rgb) {
      const luminance = getLuminance(rgb);
      return luminance > 0.5 ? '#000000' : '#ffffff';
    }

    return '#17b6b2';
  }, [getImageColorAtPoint]);

  useEffect(() => {
    if (!mounted) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(async () => {
      const color = await getContrastingColor(mousePos.x, mousePos.y);
      const allowedColors = ['#ffffff', '#000000', '#17b6b2', '#063a53'];
      const safeColor = allowedColors.includes(color) ? color : '#17b6b2';
      if (safeColor !== dynamicColor) {
        setDynamicColor(safeColor);
      }
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mousePos.x, mousePos.y, mounted, getContrastingColor, dynamicColor]);

  if (!mounted) return null;

  const size = isDragging ? 48 : 56;
  const borderWidth = isDragging ? 4 : 6;
  const offset = size / 2;
  const chevronOffset = isDragging ? '-26px' : '-30px';
  const chevronSize = isDragging ? 16 : 18;

  // Use blend mode only if white/black to create masked look
  const useBlendMode = ['#ffffff', '#000000'].includes(dynamicColor);

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
        boxShadow: `0 0 8px ${dynamicColor}`,
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        mixBlendMode: useBlendMode ? 'difference' : 'normal',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: showCursor ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <ChevronLeft
        className="absolute top-1/2 -translate-y-1/2 transition-all duration-200"
        style={{
          left: chevronOffset,
          color: dynamicColor,
        }}
        size={chevronSize}
      />
      <ChevronRight
        className="absolute top-1/2 -translate-y-1/2 transition-all duration-200"
        style={{
          right: chevronOffset,
          color: dynamicColor,
        }}
        size={chevronSize}
      />
    </motion.div>
  );
}
