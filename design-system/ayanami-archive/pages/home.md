# Home page override

The generated master is a search result, not a literal visual prescription. This page follows revised `7 / 5 / 2` dials after the user replaced both hero artworks and rejected the card-first layout.

## Foundation

- Custom React and native CSS design system. No component framework.
- Platform system font stack for an Apple-adjacent typographic voice and reliable CJK rendering.
- Light and dark themes share the same cool neutral family.
- One accent only: restrained crimson.

## Explicit overrides

- Reject Playfair Display and Inter. The tribute is premium and editorial, but not a fashion publication.
- Use one natural vertical page flow. Do not hijack the main scroll or force the artwork into a horizontal rail.
- The replacement hero art already contains its own title and attribution. Do not place live hero copy or a CTA over it.
- All archive artwork uses intrinsic aspect ratios. Do not use `object-fit: cover`, fixed card heights, or arbitrary 1:1, 4:5, and 4:3 crops.
- Show each archive image once. Use four proportional two-image rows on desktop and a strict single column on mobile.
- Gallery and source headers use a quiet hairline and two-column editorial split on wide screens, then stack with a deliberate gap on mobile.
- Remove the redundant manifesto between hero and gallery. Never let live typography compete with the title already embedded in the hero artwork.
- `绫波天下第一` is the sole large live-text moment and stays fixed at weight 500. Beneath it, each carousel frame draws 10 unique translations from a 100-language pool and replaces the entire set on the next frame. Desktop uses a strict 5-column by 2-row grid; narrow screens use two columns by five rows for legibility.
- Use frosted web materials only for floating navigation and the lightbox. They are web approximations, not official Apple Liquid Glass.
- Image surfaces use a 28px radius. Interactive controls use a pill radius. No third radius family.
- Motion communicates hierarchy, direct manipulation, feedback, or state change. All automatic motion has a reduced-motion fallback.
