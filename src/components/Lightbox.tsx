'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface LightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [isLandscape, setIsLandscape] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const lastTapTime = useRef(0);
  const panStartRef = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const isPanning = useRef(false);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const isDragging = useRef(false);

  /* Reset state when lightbox opens */
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoom(1);
      setPanOffset({ x: 0, y: 0 });
      setIsLandscape(false);
    }
  }, [isOpen, initialIndex]);

  /* Reset zoom/pan on image change */
  useEffect(() => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }, [currentIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((p) => (p + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((p) => (p - 1 + images.length) % images.length);
  }, [images.length]);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  /* ── Keyboard controls ── */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        zoom > 1 ? resetZoom() : onClose();
      } else if (e.key === 'ArrowRight') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose, goNext, goPrev, zoom, resetZoom]);

  /* ── Double-tap zoom detection ── */
  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapTime.current < 300) {
      lastTapTime.current = 0;
      if (zoom > 1) {
        resetZoom();
      } else {
        setZoom(2.5);
      }
      return true;
    }
    lastTapTime.current = now;
    return false;
  }, [zoom, resetZoom]);

  /* ── Touch handlers for swipe navigation + tap detection ── */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
    isDragging.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
    const dy = Math.abs(e.touches[0].clientY - touchStartRef.current.y);
    if (dx > 10 || dy > 10) isDragging.current = true;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (isDragging.current && zoom <= 1) {
        /* Swipe navigation when not zoomed */
        const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
        const dt = Date.now() - touchStartRef.current.time;
        if (dt < 500 && Math.abs(dx) > 50) {
          dx < 0 ? goNext() : goPrev();
          return;
        }
      }
      /* Tap → double-tap zoom */
      if (!isDragging.current) {
        handleDoubleTap();
      }
    },
    [zoom, goNext, goPrev, handleDoubleTap],
  );

  /* ── Pan when zoomed (pointer events) ── */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (zoom <= 1) return;
      e.preventDefault();
      isPanning.current = true;
      panStartRef.current = { x: e.clientX, y: e.clientY, ox: panOffset.x, oy: panOffset.y };
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        /* setPointerCapture may fail in some contexts */
      }
    },
    [zoom, panOffset],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isPanning.current || zoom <= 1) return;
      e.preventDefault();
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      setPanOffset({ x: panStartRef.current.ox + dx, y: panStartRef.current.oy + dy });
    },
    [zoom],
  );

  const handlePointerUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  /* ── Zoom controls ── */
  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(4, z < 1.5 ? 2.5 : z + 0.5));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(1, z - 0.5));
  }, []);

  const toggleLandscape = useCallback(() => {
    setIsLandscape((l) => !l);
    resetZoom();
  }, [resetZoom]);

  /* ── Image dimensions based on mode ── */
  const imgMaxW = isLandscape ? '100vh' : '92vw';
  const imgMaxH = isLandscape ? '100vw' : '88vh';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col select-none"
          onClick={() => {
            if (zoom > 1) {
              resetZoom();
            } else {
              onClose();
            }
          }}
        >
          {/* ═══ Top Bar ═══ */}
          <div
            className="flex items-center justify-between px-4 pt-4 pb-2 z-30 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Counter */}
            <div className="text-white/60 text-sm font-medium tracking-wide">
              {currentIndex + 1}
              <span className="text-white/30 mx-1">/</span>
              {images.length}
            </div>

            {/* Controls cluster */}
            <div className="flex items-center gap-1.5">
              {/* Zoom out */}
              <button
                onClick={zoomOut}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                  zoom > 1 ? 'bg-white/15 text-white' : 'text-white/20 pointer-events-none'
                }`}
                aria-label="Reducir zoom"
              >
                <ZoomOut size={16} />
              </button>

              {/* Zoom in */}
              <button
                onClick={zoomIn}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200"
                aria-label="Ampliar zoom"
              >
                <ZoomIn size={16} />
              </button>

              {/* Landscape toggle — mobile only */}
              <button
                onClick={toggleLandscape}
                className="md:hidden w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200"
                aria-label="Modo horizontal"
              >
                <RotateCw size={16} className={isLandscape ? 'text-[#d4a017]' : ''} />
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ═══ Image Area ═══ */}
          <div
            className="flex-1 flex items-center justify-center overflow-hidden relative min-h-0"
            onClick={(e) => {
              e.stopPropagation();
              if (zoom > 1) {
                resetZoom();
              }
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              cursor: zoom > 1 ? 'grab' : 'zoom-in',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${isLandscape}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-full h-full"
              >
                <div
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  style={{
                    transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})${
                      isLandscape ? ' rotate(90deg)' : ''
                    }`,
                    transformOrigin: 'center center',
                    transition: isPanning.current ? 'none' : 'transform 0.3s cubic-bezier(0.25,0.1,0.25,1)',
                    touchAction: zoom > 1 ? 'none' : 'pan-y',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[currentIndex]}
                    alt={`Imagen ${currentIndex + 1}`}
                    className="object-contain pointer-events-none"
                    draggable={false}
                    style={{
                      maxWidth: imgMaxW,
                      maxHeight: imgMaxH,
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Zoom level indicator */}
            {zoom > 1 && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white/70 text-xs font-medium">
                {Math.round(zoom * 100)}%
              </div>
            )}
          </div>

          {/* ═══ Navigation Arrows (hidden when zoomed) ═══ */}
          {images.length > 1 && zoom <= 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* ═══ Thumbnail Strip ═══ */}
          {images.length > 1 && (
            <div
              className="shrink-0 flex items-center justify-center gap-2 px-4 py-3 z-30"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-11 h-11 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                    i === currentIndex
                      ? 'border-[#d4a017] scale-110 shadow-lg shadow-[#d4a017]/20'
                      : 'border-transparent opacity-40 hover:opacity-70 active:scale-95'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`Miniatura ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
