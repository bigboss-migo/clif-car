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
        intro="No dealership runaround, no guessing games. One team handles sourcing, funding and delivery — and you see every number before you commit."
      />
      <AtAGlance />
      <StepByStep />
      <Comparison />
      <ClosingCTA
        heading={`Start with ${site.ownerFirstName} today`}
        body="Tell us the car you want. We'll handle the search, the financing and the delivery, and you'll approve every number along the way."
      >
        <PrequalButton variant="secondary" />
      </ClosingCTA>
    </div>
  );
}
