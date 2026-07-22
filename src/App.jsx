import { useCallback, useEffect, useState } from "react";
import { ArchiveGallery } from "./components/ArchiveGallery";
import { Credits } from "./components/Credits";
import { Hero } from "./components/Hero";
import { Lightbox } from "./components/Lightbox";
import { Navigation } from "./components/Navigation";
import { Tribute } from "./components/Tribute";
import { galleryItems } from "./galleryData";

function getInitialTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("ayanami-theme", theme);
    } catch {
      // The theme still works for this visit when storage is unavailable.
    }
  }, [theme]);

  const openImage = useCallback((index, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextSelection = {
      index,
      origin: `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`,
    };
    requestAnimationFrame(() => {
      setSelection(nextSelection);
    });
  }, []);

  const closeImage = useCallback(() => setSelection(null), []);

  const moveImage = useCallback((direction) => {
    setSelection((current) => {
      if (!current) return current;
      const index = (current.index + direction + galleryItems.length) % galleryItems.length;
      return { ...current, index };
    });
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <Navigation
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      />
      <main id="main-content">
        <Hero />
        <ArchiveGallery onOpen={openImage} />
        <Tribute />
        <Credits />
      </main>
      <footer className="site-footer">
        <p className="site-footer-note">献给绫波</p>
        <a href="#top" aria-label="回到页面顶部">AYANAMI</a>
      </footer>
      <Lightbox selection={selection} onClose={closeImage} onMove={moveImage} />
    </>
  );
}
