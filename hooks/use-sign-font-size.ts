'use client';

import { useEffect, useState, type RefObject } from 'react';
import { fitSignFontSize } from '@/lib/sign-layout';

/** Measures actual Norse glyph widths; formatting tags never count as letters. */
export function useSignFontSize(
  scene: RefObject<HTMLDivElement | null>,
  text: string,
) {
  const [fontSize, setFontSize] = useState<number | null>(null);
  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const context = document.createElement('canvas').getContext('2d');
    if (!context) return;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      context.font = '400 100px Norse, sans-serif';
      const capital = context.measureText('H');
      const lines = text.split(/\r?\n/);
      const size = fitSignFontSize({
        sceneWidth: element.clientWidth,
        longestLineWidthAt100: Math.max(
          0,
          ...lines.map(
            (line) => context.measureText(line.replace(/\t/g, '    ')).width,
          ),
        ),
        capHeightAt100:
          capital.actualBoundingBoxAscent + capital.actualBoundingBoxDescent ||
          70,
        lineCount: lines.length,
      });
      if (size > 0) setFontSize(Math.round(size * 100) / 100);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    void document.fonts
      .load('400 100px Norse')
      .then(measure)
      .catch(() => {});
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [scene, text]);
  return fontSize;
}
