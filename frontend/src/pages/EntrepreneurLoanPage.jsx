import site from "@/config/site";
import { Seo } from "@/components/Seo";
import { Highlight, PageHero } from "@/components/PageHero";
import { FactStrip } from "@/pages/entrepreneur/FactStrip";
import { WhatItIs } from "@/pages/entrepreneur/WhatItIs";
import { WhoItsFor } from "@/pages/entrepreneur/WhoItsFor";
import { HowItWorks } from "@/pages/entrepreneur/HowItWorks";
import { FAQ } from "@/pages/entrepreneur/FAQ";

export default function EntrepreneurLoanPage() {
  return (
    <div data-testid="entrepreneur-loan-page">
      <Seo
        title="Entrepreneur Loan"
        description={`Auto financing for people who work for themselves.`}
      />
      <PageHero
        id="entrepreneur-loan"
        image={site.heroImages.entrepreneurLoan}
        eyebrow="Business & 1099 financing"
        title={<>Own a <Highlight>business</Highlight>, work as a <Highlight>1099</Highlight> contractor, or earn <Highlight>freelance income?</Highlight></>}
        intro="Instant Drive Autos can help you explore auto financing through our lending partners and understand what information they may need to review your income."
      />
      <FactStrip />
      <WhatItIs />
      <WhoItsFor />
      <HowItWorks />
      <FAQ />
    </div>
  );
}
