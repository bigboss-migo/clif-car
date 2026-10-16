import { Eyebrow } from "@/components/Eyebrow";

const hasImage = (src) => typeof src === "string" && src.startsWith("http");

export const PageHero = ({ eyebrow, title, intro, image, id = "page" }) => (
  <section data-testid={`${id}-hero`} className="relative overflow-hidden bg-chrome text-chrome-foreground">
    {hasImage(image) && (
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-40" />
    )}
    <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
      {eyebrow && <Eyebrow data-testid={`${id}-hero-eyebrow`}>{eyebrow}</Eyebrow>}
      <h1 data-testid={`${id}-page-heading`} className="mt-3 font-display text-4xl uppercase sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {intro && (
        <p data-testid={`${id}-page-placeholder`} className="mt-4 max-w-2xl text-sm opacity-80 sm:text-base">
          {intro}
        </p>
      )}
    </div>
  </section>
);
