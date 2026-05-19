'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Shrink } from 'lucide-react';

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
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const lastTapTime = useRef(0);
  const panStartRef = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const isPanning = useRef(false);
  const didPanRef = useRef(false);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  /* Reset state when lightbox opens */
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoom(1);
      setPanOffset({ x: 0, y: 0 });
      setOrigin({ x: 50, y: 50 });
      setIsLandscape(false);
    }
  }, [isOpen, initialIndex]);

  /* Reset zoom/pan on image change */
  useEffect(() => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
    setOrigin({ x: 50, y: 50 });
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
    setOrigin({ x: 50, y: 50 });
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
    if (now - lastTapTime.current < 350) {
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

  /* ── Click-to-zoom on PC ── */
  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (zoom > 1) {
        didPanRef.current = false;
        return;
      }
      if (didPanRef.current) {
        didPanRef.current = false;
        return;
      }
      const container = imageContainerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setOrigin({ x, y });
      setPanOffset({ x: 0, y: 0 });
      setZoom(2.5);
    },
    [zoom],
  );

  /* ── Touch handlers — REWRITTEN for reliability ── */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartRef.current.x);
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartRef.current.y);
      const dt = Date.now() - touchStartRef.current.time;
      const totalMove = Math.sqrt(dx * dx + dy * dy);

      /* ── When ZOOMED IN ── */
      if (zoom > 1) {
        /* Small movement (< 20px) = tap → try double-tap to reset zoom */
        if (totalMove < 20) {
          handleDoubleTap();
        }
        /* Large movement = pan (already handled by pointer events) */
        return;
      }

      /* ── When NOT zoomed ── */
      /* Swipe navigation: fast horizontal swipe > 50px */
      if (totalMove > 50 && dt < 500) {
        const swipeDx = e.changedTouches[0].clientX - touchStartRef.current.x;
        swipeDx < 0 ? goNext() : goPrev();
        return;
      }

      /* Small tap → double-tap zoom */
      if (totalMove < 20) {
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
      didPanRef.current = false;
      panStartRef.current = { x: e.clientX, y: e.clientY, ox: panOffset.x, oy: panOffset.y };
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch { /* noop */ }
    },
    [zoom, panOffset],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isPanning.current || zoom <= 1) return;
      e.preventDefault();
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        didPanRef.current = true;
      }
      setPanOffset({ x: panStartRef.current.ox + dx, y: panStartRef.current.oy + dy });
    },
    [zoom],
  );

  const handlePointerUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  /* ── Zoom controls ── */
  const zoomIn = useCallback(() => {
    if (zoom > 1) {
      setZoom((z) => Math.min(4, z + 0.5));
    } else {
      setZoom(2.5);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [zoom]);

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(1, z - 0.5));
    if (zoom - 0.5 <= 1) {
      setPanOffset({ x: 0, y: 0 });
      setOrigin({ x: 50, y: 50 });
    }
  }, [zoom]);

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
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col select-none"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          {/* ═══ BACKGROUND — click closes when not zoomed ═══ */}
          <div
            className="absolute inset-0 z-0"
            onClick={() => {
              if (zoom > 1) resetZoom();
              else onClose();
            }}
          />

          {/* ═══ TOP BAR — Bright, always visible ═══ */}
          <div
            className="relative z-40 flex items-center justify-between shrink-0 px-3 py-2 md:px-5 md:py-3"
            onClick={(e) => e.stopPropagation()}
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
          >
            {/* Left: Counter */}
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-white text-sm md:text-base font-bold tabular-nums">
                {currentIndex + 1}
              </span>
              <span className="text-white/40 text-sm">/</span>
              <span className="text-white/60 text-sm md:text-base tabular-nums">
                {images.length}
              </span>
            </div>

            {/* Right: Controls — HIGH CONTRAST */}
            <div className="flex items-center gap-2">
              {/* Reset zoom — visible when zoomed */}
              {zoom > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); resetZoom(); }}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#d4a017]/90 text-[#001C3D] flex items-center justify-center shadow-lg shadow-black/40 transition-all duration-200 active:scale-95"
                  aria-label="Restablecer zoom"
                >
                  <Shrink size={18} strokeWidth={2.5} />
                </button>
              )}

              {/* Zoom out */}
              <button
                onClick={(e) => { e.stopPropagation(); zoomOut(); }}
                className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
                  zoom > 1
                    ? 'bg-white/30 text-white shadow-lg shadow-black/30'
                    : 'bg-black/40 text-white/20 pointer-events-none'
                }`}
                aria-label="Reducir zoom"
              >
                <ZoomOut size={18} strokeWidth={2} />
              </button>

              {/* Zoom in */}
              <button
                onClick={(e) => { e.stopPropagation(); zoomIn(); }}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/25 text-white flex items-center justify-center shadow-md shadow-black/20 transition-all duration-200 active:scale-95"
                aria-label="Ampliar zoom"
              >
                <ZoomIn size={18} strokeWidth={2} />
              </button>

              {/* Landscape — mobile only */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleLandscape(); }}
                className="md:hidden w-10 h-10 rounded-full bg-white/25 text-white flex items-center justify-center shadow-md shadow-black/20 transition-all duration-200 active:scale-95"
                aria-label="Modo horizontal"
              >
                <RotateCw size={18} strokeWidth={2} className={isLandscape ? 'text-[#d4a017]' : ''} />
              </button>

              {/* Separator */}
              <div className="w-px h-6 bg-white/15" />

              {/* CLOSE — Always prominent */}
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-red-500/90 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/30 transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Cerrar galería"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* ═══ IMAGE AREA ═══ */}
          <div
            ref={imageContainerRef}
            className="flex-1 flex items-center justify-center overflow-hidden relative min-h-0 z-10"
            onClick={handleImageClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              cursor: zoom > 1 ? 'grab' : 'zoom-in',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${isLandscape}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
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
                    transformOrigin: `${origin.x}% ${origin.y}%`,
                    transition: isPanning.current ? 'none' : 'transform 0.35s cubic-bezier(0.25,0.1,0.25,1)',
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
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-[#d4a017]/80 text-[#001C3D] text-xs font-bold"
              >
                {Math.round(zoom * 100)}% — toca 2x para salir
              </motion.div>
            )}
          </div>

          {/* ═══ Navigation Arrows (hidden when zoomed) ═══ */}
          {images.length > 1 && zoom <= 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/15 transition-all duration-200 hover:bg-black/70 active:scale-95"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={24} strokeWidth={2} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/15 transition-all duration-200 hover:bg-black/70 active:scale-95"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={24} strokeWidth={2} />
              </button>
            </>
          )}

          {/* ═══ Thumbnail Strip ═══ */}
          {images.length > 1 && (
            <div
              className="shrink-0 z-40 flex items-center justify-center gap-2 px-3 py-2.5 md:px-4 md:py-3"
              onClick={(e) => e.stopPropagation()}
              style={{
                paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
              }}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    i === currentIndex
                      ? 'w-14 h-14 md:w-16 md:h-16 border-[#d4a017] scale-105 shadow-lg shadow-[#d4a017]/30'
                      : 'w-10 h-10 md:w-12 md:h-12 border-transparent opacity-40 hover:opacity-80 active:scale-95'
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
