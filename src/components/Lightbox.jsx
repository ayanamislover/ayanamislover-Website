import { useEffect, useRef } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { galleryItems } from "../galleryData";
import { SmartImage } from "./SmartImage";

const easeSoft = [0.22, 1, 0.36, 1];
const easeOutExpo = [0.16, 1, 0.3, 1];

export function Lightbox({ selection, onClose, onMove }) {
  const closeRef = useRef(null);
  const restoreFocusRef = useRef(null);
  const item = selection ? galleryItems[selection.index] : null;

  useEffect(() => {
    if (!selection) return undefined;
    restoreFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onMove(-1);
      if (event.key === "ArrowRight") onMove(1);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [selection, onClose, onMove]);

  const total = galleryItems.length;
  const position = selection ? selection.index + 1 : 0;
  const counter = `${String(position).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <AnimatePresence>
      {selection && item ? (
        <m.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.24, ease: "easeOut" } }}
          transition={{ duration: 0.34, ease: easeSoft }}
        >
          <m.div
            className="lightbox-panel"
            style={{ transformOrigin: selection.origin }}
            initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)", transition: { duration: 0.22, ease: "easeOut" } }}
            transition={{ duration: 0.52, ease: easeOutExpo }}
          >
            <div className="lightbox-toolbar">
              <p id="lightbox-title">{item.title}</p>
              <div className="lightbox-toolbar-meta">
                <span className="lightbox-counter" aria-hidden="true">{counter}</span>
                <span className="lightbox-divider" aria-hidden="true" />
                <button className="icon-button" type="button" onClick={onClose} ref={closeRef} aria-label="关闭大图">
                  <X aria-hidden="true" weight="bold" />
                </button>
              </div>
            </div>
            <div className="lightbox-image-wrap">
              <AnimatePresence initial={false}>
                <m.div
                  key={selection.index}
                  className="lightbox-frame"
                  initial={{ opacity: 0, scale: 0.99, filter: "blur(12px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.008, filter: "blur(12px)" }}
                  transition={{ duration: 0.28, ease: easeSoft }}
                >
                  <SmartImage
                    alt={item.alt}
                    className="lightbox-image"
                    eager
                    sourceSet={item.sourceSet}
                    src={item.src}
                    width={item.width}
                    height={item.height}
                    sizes="96vw"
                  />
                </m.div>
              </AnimatePresence>
            </div>
            <div className="lightbox-navigation">
              <div className="lightbox-controls">
                <button className="icon-button" type="button" onClick={() => onMove(-1)} aria-label="上一张图片">
                  <ArrowLeft aria-hidden="true" weight="bold" />
                </button>
                <span className="lightbox-counter lightbox-counter-live" aria-live="polite" aria-atomic="true">
                  {counter}
                </span>
                <button className="icon-button" type="button" onClick={() => onMove(1)} aria-label="下一张图片">
                  <ArrowRight aria-hidden="true" weight="bold" />
                </button>
              </div>
              <div className="lightbox-progress" aria-hidden="true">
                <div className="lightbox-progress-fill" style={{ width: `${(position / total) * 100}%` }} />
              </div>
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
