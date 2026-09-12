# Academic editorial design

Reviewed on 2026-09-12:

- https://github.com/w-r-s/academic-homepage-template/tree/main and its live preview: compact academic hierarchy, restrained dividers, dated news, topical publication navigation, inline contact icons and copy-email interaction. Its Lato/14px body and orange palette are not adopted: this site needs larger text and blue colors.
- https://chenyangsi.top/: Lora display headings paired with DM Sans body text, persistent navigation, outlined social controls, short ease-out entrances, scroll reveal and subtle hover feedback. The dark purple hero and other people's content are not adopted.

Implementation is original; no third-party code, photos, icons or personal content are copied. Icons use the existing Lucide dependency. Existing personal links, article routes, author lists and research claims remain authoritative.

`app/editorial.css` is the shared visual layer after the base, Blog and experience styles. It defines the blue palette, Lora display typography, responsive navigation, compact section rhythm, contact controls and publication directory. Chinese body text retains system CJK sans-serif with locally hosted Noto Sans SC fallback; English body text remains DM Sans. Paper titles remain sans-serif for readability. Article-specific structural styles remain in the AgenticASR CSS module.

Accessibility constraints: English by default; explicit language preference persists; active navigation has `aria-current`; copy status uses a live region without replacing the original mailto link; no content hidden until JavaScript executes; all new motion respects the existing pause control and system reduced-motion setting. Header height is shared across routes so mobile content and anchor destinations are not obscured.

## Series tabs and motion

Publications now presents one research series at a time through `components/series-reader.tsx`. The tab labels and paper counts are derived from the existing publication data; no publication or resource is removed. Only series tabs are shown, without previous/next controls or page numbers. Arrow/Home/End keyboard navigation shares the same selection state. Existing `#<series-id>-title` fragments select the corresponding series, remain bookmarkable, and work with browser back/forward. Without JavaScript, and when printing, all series remain readable.

`app/series-motion.css` adds directional 380ms series entrances, selected-tab underline transitions, image-card hover depth, and resource-icon feedback. The native mouse pointer is unchanged; no halo or pointer-following effect is added. The shared motion toggle and system reduced-motion preference disable the series animation.
