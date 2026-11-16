import site from "@/config/site";
import { Seo } from "@/components/Seo";
import { Highlight, PageHero } from "@/components/PageHero";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { privacy } from "@/pages/legal/privacyContent";

export default function PrivacyPolicyPage() {
  return (
    <div data-testid="privacy-page">
      <Seo
        title="Privacy Policy"
        description={`How ${site.brandName} collects, uses and protects your personal information.`}
      />
      <PageHero id="privacy" eyebrow="Legal" title={<>Privacy <Highlight>Policy</Highlight></>} />
      <LegalDocument id="privacy" {...privacy} />
    </div>
  );
}
