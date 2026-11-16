import site from "@/config/site";
import { Seo } from "@/components/Seo";
import { Highlight, PageHero } from "@/components/PageHero";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { terms } from "@/pages/legal/termsContent";

export default function TermsOfUsePage() {
  return (
    <div data-testid="terms-page">
      <Seo
        title="Terms of Use"
        description={`The terms that govern your use of the ${site.brandName} website and services.`}
      />
      <PageHero id="terms" eyebrow="Legal" title={<>Terms of <Highlight>Use</Highlight></>} />
      <LegalDocument id="terms" {...terms} />
    </div>
  );
}
