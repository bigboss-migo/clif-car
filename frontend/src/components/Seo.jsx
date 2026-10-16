import site from "@/config/site";

// React 19 hoists <title> and <meta> into <head>.
export const Seo = ({ title, description }) => (
  <>
    <title>{`${title} | ${site.brandName} ${site.brandSub}`}</title>
    <meta name="description" content={description} />
  </>
);
