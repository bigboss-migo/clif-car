import site from "@/config/site";
import { Seo } from "@/components/Seo";
import { Highlight, PageHero } from "@/components/PageHero";
import { ClosingCTA } from "@/components/ClosingCTA";
import { PrequalButton } from "@/components/PrequalButton";
import { AtAGlance } from "@/pages/process/AtAGlance";
import { StepByStep } from "@/pages/process/StepByStep";
import { Comparison } from "@/pages/process/Comparison";

export default function ProcessPage() {
  return (
    <div data-testid="process-page">
      <Seo
        title="The Process"
        description={`How ${site.brandName} sources, funds and delivers your next car, with every number shown before you commit.`}
      />
      <PageHero
        id="process"
        image={site.heroImages.process}
        eyebrow="The Process"
        title={<>Work with {site.ownerFirstName} <Highlight>start to finish</Highlight></>}
        intro="Instant Drive Autos helps you find a car that fits your budget. Tell us what you’re looking for, and we’ll work with our dealership partners to find options you can compare before you decide."
      />
      <AtAGlance />
      <StepByStep />
      <Comparison />
      <ClosingCTA
        heading={`Start with ${site.ownerFirstName} today`}
        body="Already know the exact model you want? Still deciding between a few options? Tell us where you’re at and how to reach you."
      >
        <PrequalButton variant="secondary" />
      </ClosingCTA>
    </div>
  );
}
