import { m } from "motion/react";
import { galleryItems } from "../galleryData";
import { SmartImage } from "./SmartImage";

const rows = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
];

export function ArchiveGallery({ onOpen }) {
  return (
    <section className="archive section-shell" id="gallery" aria-labelledby="gallery-title">
      <m.div
        className="section-heading archive-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 id="gallery-title">绫波画廊</h2>
      </m.div>

      <div className="archive-rows">
        {rows.map(([leftIndex, rightIndex]) => {
          const left = galleryItems[leftIndex];
          const right = galleryItems[rightIndex];
          const columns = `${left.width / left.height}fr ${right.width / right.height}fr`;

          return (
            <div
              className="archive-row"
              key={`${left.id}-${right.id}`}
              style={{ gridTemplateColumns: columns }}
            >
              {[leftIndex, rightIndex].map((index, columnIndex) => {
                const item = galleryItems[index];
                return (
                  <m.figure
                    className="gallery-artwork"
                    key={item.id}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05, margin: "0px 0px 12% 0px" }}
                    transition={{ duration: 0.8, delay: columnIndex * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button className="image-button" type="button" onClick={(event) => onOpen(index, event)}>
                      <SmartImage
                        alt={item.alt}
                        className="archive-image"
                        sourceSet={item.sourceSet}
                        src={item.src}
                        width={item.width}
                        height={item.height}
                        sizes="(max-width: 760px) 92vw, 58vw"
                      />
                      <span className="sr-only">放大查看{item.title}</span>
                    </button>
                  </m.figure>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
