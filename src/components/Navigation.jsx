import { useEffect, useState } from "react";
import { m } from "motion/react";
import { Moon, Sun } from "@phosphor-icons/react";

const links = [
  { label: "画廊", href: "#gallery", mobile: true },
  { label: "心意", href: "#tribute", mobile: false },
  { label: "出处", href: "#credits", mobile: true },
];

const sectionIds = links.map((link) => link.href.slice(1));

export function Navigation({ theme, onToggleTheme }) {
  const nextTheme = theme === "dark" ? "浅色" : "深色";
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      // Small hysteresis band so the shell does not flicker at the threshold.
      setIsScrolled((previous) => (previous ? scrollY > 16 : scrollY > 24));

      // Lightweight active-anchor tracking: the last section whose top has
      // passed the reading line is the current one; none while over the hero.
      const readingLine = scrollY + window.innerHeight * 0.32;
      let current = "";
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= readingLine) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    const requestUpdate = () => {
      if (frame === 0) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame !== 0) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <m.header
      className={isScrolled ? "navigation-shell is-scrolled" : "navigation-shell"}
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <a className="brand-mark" href="#top" aria-label="返回 AYANAMI 首页顶部">
        <span className="brand-word">AYANAMI</span>
        <span className="brand-dot" aria-hidden="true" />
      </a>
      <nav className="primary-navigation" aria-label="主导航">
        {links.map((link) => {
          const isActive = activeSection === link.href.slice(1);
          const classNames = ["nav-link"];
          if (!link.mobile) classNames.push("nav-link-optional");
          if (isActive) classNames.push("is-active");
          return (
            <a
              className={classNames.join(" ")}
              href={link.href}
              key={link.href}
              aria-current={isActive ? "location" : undefined}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
      <button
        className="icon-button theme-toggle"
        type="button"
        onClick={onToggleTheme}
        aria-label={`切换为${nextTheme}模式`}
        aria-pressed={theme === "dark"}
        title={`切换为${nextTheme}模式`}
      >
        <span className="theme-toggle-icons" aria-hidden="true">
          <Sun className="theme-icon theme-icon-sun" weight="regular" />
          <Moon className="theme-icon theme-icon-moon" weight="regular" />
        </span>
      </button>
    </m.header>
  );
}
