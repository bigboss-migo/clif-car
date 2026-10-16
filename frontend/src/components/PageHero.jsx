import { Eyebrow } from "@/components/Eyebrow";

const hasImage = (src) => typeof src === "string" && src.startsWith("http");

export const Highlight = ({ children }) => <span className="text-primary">{children}</span>;

const HeroBackdrop = ({ image }) =>
  hasImage(image) ? (
    <>
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
    </>
  ) : (
    <div aria-hidden="true" className="stage-gradient absolute inset-0" />
  );

export const PageHero = ({ eyebrow, title, intro, image, id = "page" }) => (
  <section data-testid={`${id}-hero`} className="relative overflow-hidden border-b border-border">
    <HeroBackdrop image={image} />
    <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28">
      {eyebrow && <Eyebrow data-testid={`${id}-hero-eyebrow`}>{eyebrow}</Eyebrow>}
      <h1
        data-testid={`${id}-page-heading`}
        className="mt-4 max-w-4xl text-5xl uppercase leading-[0.95] tracking-wide md:text-7xl"
      >
        {title}
      </h1>
      {intro && (
        <p data-testid={`${id}-page-placeholder`} className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}
    </div>
  </section>
);
