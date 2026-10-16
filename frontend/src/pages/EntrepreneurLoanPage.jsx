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
        description={`Vehicle financing from ${site.brandName} for business owners and 1099 earners, underwritten on business income and deposits.`}
      />
      <PageHero
        id="entrepreneur-loan"
        image={site.heroImages.entrepreneurLoan}
        eyebrow="Business & 1099 financing"
        title={<>The home of <Highlight>Entrepreneur Loans</Highlight></>}
        intro="Get evaluated on the income your business actually brings in, not just a credit score that was never designed for how entrepreneurs earn."
      />
      <FactStrip />
      <WhatItIs />
      <WhoItsFor />
      <HowItWorks />
      <FAQ />
    </div>
  );
}
