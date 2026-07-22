import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { tributes } from "../galleryData";

const ROTATION_SIZE = 4;

function selectionKey(selection) {
  return selection.map((item) => item.lang).sort().join("|");
}

function pickRandomTributes(previous = []) {
  const previousKey = selectionKey(previous);
  let selection;

  do {
    const candidates = [...tributes];
    for (let index = candidates.length - 1; index > 0; index -= 1) {
      const replacement = Math.floor(Math.random() * (index + 1));
      [candidates[index], candidates[replacement]] = [candidates[replacement], candidates[index]];
    }
    selection = candidates.slice(0, ROTATION_SIZE);
  } while (selectionKey(selection) === previousKey);

  return selection;
}

export function Tribute() {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(pickRandomTributes);
  const reduceMotion = useReducedMotion();
  const rotationKey = rotation.map((item) => item.lang).join("-");

  useEffect(() => {
    if (reduceMotion || isHovered) return undefined;

    const timerId = window.setInterval(() => {
      if (!document.hidden) {
        setRotation((current) => pickRandomTributes(current));
      }
    }, 4200);

    return () => window.clearInterval(timerId);
  }, [isHovered, reduceMotion]);

  return (
    <section
      aria-label="多语言绫波宣言"
      className="tribute section-shell"
      data-language-pool-size={tributes.length}
      data-rotation-size={rotation.length}
      id="tribute"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <div className="tribute-content">
        <div className="tribute-stage">
          <p className="tribute-primary" lang="zh-CN">绫波天下第一</p>
          <div className="tribute-translation" aria-live="off">
            <AnimatePresence mode="wait" initial={false}>
              <m.ul
                className="tribute-quartet"
                key={rotationKey}
                initial={{ opacity: 0, y: 14, filter: "blur(7px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: reduceMotion ? 0 : 0.48, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  filter: "blur(5px)",
                  transition: { duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                {rotation.map((item) => (
                  <li className="tribute-language" dir={item.dir} key={item.lang} lang={item.lang}>
                    <span className="tribute-language-code">{item.code}</span>
                    <span className="tribute-language-text">{item.text}</span>
                  </li>
                ))}
              </m.ul>
            </AnimatePresence>
          </div>
        </div>
        <div className="tribute-divider" aria-hidden="true">
          <span className="tribute-divider-line" />
          <span className="tribute-divider-mark">{"✳︎"}</span>
          <span className="tribute-divider-line" />
        </div>
      </div>
    </section>
  );
}
