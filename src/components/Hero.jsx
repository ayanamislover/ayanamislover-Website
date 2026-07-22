import { useEffect, useRef } from "react";
import { SmartImage } from "./SmartImage";

const heroBase = `${import.meta.env.BASE_URL}assets/hero`;

export function Hero() {
  const heroRef = useRef(null);
  const driftRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const drift = driftRef.current;
    if (!hero || !drift) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;
    let scheduled = false;

    const update = () => {
      scheduled = false;
      rafId = 0;
      const y = window.scrollY || 0;

      // Scroll cue fades away once the visitor starts reading the page.
      const flag = y > 24 ? "true" : "false";
      if (hero.dataset.scrolled !== flag) {
        hero.dataset.scrolled = flag;
      }

      // Hand-scroll drift is purely decorative; honour reduced motion.
      if (motionQuery.matches) {
        if (drift.style.transform) drift.style.transform = "";
        return;
      }
      const driftY = Math.min(y * 0.055, 44);
      const driftScale = Math.min(1 + y * 0.00004, 1.035);
      drift.style.transform = `translate3d(0, ${driftY.toFixed(2)}px, 0) scale(${driftScale.toFixed(4)})`;
    };

    const requestUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    const onMotionPreferenceChange = () => requestUpdate();
    motionQuery.addEventListener?.("change", onMotionPreferenceChange);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      motionQuery.removeEventListener?.("change", onMotionPreferenceChange);
      if (rafId) window.cancelAnimationFrame(rafId);
      drift.style.transform = "";
    };
  }, []);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={heroRef}>
      <h1 className="sr-only" id="hero-title">AYANAMI 绫波</h1>
      <div className="hero-stage">
        <div className="hero-drift" ref={driftRef}>
          <div className="hero-art">
            <SmartImage
              alt="樱花帝国主题装束的绫波手持佩刀，站在明亮的樱花场景中"
              className="hero-image"
              eager
              width="1672"
              height="941"
              sizes="100vw"
              sourceSet={[
                {
                  type: "image/avif",
                  media: "(max-width: 760px) and (orientation: portrait)",
                  srcSet: `${heroBase}/ayanami-hero-mobile-480.avif 480w, ${heroBase}/ayanami-hero-mobile-941.avif 941w`,
                },
                {
                  type: "image/avif",
                  srcSet: `${heroBase}/ayanami-hero-960.avif 960w, ${heroBase}/ayanami-hero-1672.avif 1672w`,
                },
                {
                  type: "image/webp",
                  media: "(max-width: 760px) and (orientation: portrait)",
                  srcSet: `${heroBase}/ayanami-hero-mobile-480.webp 480w, ${heroBase}/ayanami-hero-mobile-941.webp 941w`,
                },
                {
                  type: "image/webp",
                  srcSet: `${heroBase}/ayanami-hero-960.webp 960w, ${heroBase}/ayanami-hero-1672.webp 1672w`,
                },
              ]}
              src={`${heroBase}/ayanami-hero-1672.webp`}
            />
          </div>
        </div>
      </div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span className="hero-scroll-cue-label">SCROLL</span>
        <span className="hero-scroll-cue-line" />
      </div>
    </section>
  );
}
