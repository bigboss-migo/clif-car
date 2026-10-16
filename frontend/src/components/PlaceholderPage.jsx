import { PageHero } from "@/components/PageHero";

export const PlaceholderPage = ({ id, eyebrow, title, text, image, children }) => (
  <div data-testid={`${id}-page`}>
    <PageHero id={id} eyebrow={eyebrow} title={title} intro={text} image={image} />
    {children}
  </div>
);
