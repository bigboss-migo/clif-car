import site from "@/config/site";
import { Seo } from "@/components/Seo";
import { Highlight, PageHero } from "@/components/PageHero";
import { PaymentCalculator } from "@/components/calculator/PaymentCalculator";

export default function CalculatorPage() {
  return (
    <div data-testid="calculator-page">
      <Seo
        title="Payment Calculator"
        description={`Estimate your monthly car payment with ${site.brandName}, including taxes, fees and the broker fee.`}
      />
      <PageHero
        id="calculator"
        image={site.heroImages.calculator}
        eyebrow="Calculator"
        title={<>Run the <Highlight>numbers</Highlight></>}
        intro="Switch between finance and lease, then adjust price, down payment, credit profile and term to see a live monthly estimate, with every tax and fee shown."
      />
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <PaymentCalculator initialPrice={150000} defaultTier="prime" />
          <p data-testid="calc-disclaimer" className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            Estimates only. Rates, taxes and fees are illustrative and vary by lender, state and credit approval. Your
            final terms are confirmed before you sign anything.
          </p>
        </div>
      </section>
    </div>
  );
}
