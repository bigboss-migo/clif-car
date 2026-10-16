import { PageHero } from "@/components/PageHero";
import { Seo } from "@/components/Seo";

export const PlaceholderPage = ({ id, eyebrow, title, text, image, description, children }) => (
  <div data-testid={`${id}-page`}>
    <Seo title={title} description={description} />
    <PageHero id={id} eyebrow={eyebrow} title={title} intro={text} image={image} />
    {children}
  </div>
);
