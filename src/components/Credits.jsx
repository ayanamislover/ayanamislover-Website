import { ArrowUpRight } from "@phosphor-icons/react";
import { m } from "motion/react";
import { artists } from "../galleryData";

const easeOutExpo = [0.16, 1, 0.3, 1];

export function Credits() {
  return (
    <section className="credits section-shell" id="credits" aria-labelledby="credits-title">
      <m.div
        className="section-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.65, ease: easeOutExpo }}
      >
        <h2 id="credits-title">原作者鸣谢</h2>
      </m.div>
      <div className="artist-grid" aria-label="插画作者链接">
        {[artists.slice(0, 3), artists.slice(3)].map((group, groupIndex) => (
          <div className="artist-column" key={groupIndex}>
            {group.map((artist, artistIndex) => {
              const rowIndex = groupIndex * 3 + artistIndex;
              return (
                <m.a
                  href={artist.href}
                  key={artist.href}
                  rel="noreferrer"
                  target="_blank"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.75, ease: easeOutExpo, delay: 0.06 * rowIndex }}
                >
                  <span className="artist-index" aria-hidden="true">
                    {String(rowIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="artist-name">{artist.name}</span>
                  <ArrowUpRight aria-hidden="true" weight="bold" />
                </m.a>
              );
            })}
          </div>
        ))}
      </div>
      <m.p
        className="rights-note"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.12 }}
      >
        《碧蓝航线》及相关角色权利归原权利方所有。本站为非商业同人展示。
      </m.p>
    </section>
  );
}
