import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Eyebrow } from "@/components/Eyebrow";
import { faqs } from "@/pages/entrepreneur/content";

export const FAQ = () => (
  <section data-testid="entrepreneur-faq" className="border-b border-border bg-surface">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div>
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-4 text-3xl md:text-5xl">Questions, answered</h2>
        <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
          Documents, credit checks and timing — the things people ask before they start.
        </p>
      </div>
      <Accordion type="single" collapsible className="border-t border-border">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`faq-${i}`} className="border-border">
            <AccordionTrigger data-testid={`faq-trigger-${i + 1}`} className="py-6 text-base font-semibold hover:no-underline hover:text-primary md:text-lg">
              {f.q}
            </AccordionTrigger>
            <AccordionContent data-testid={`faq-answer-${i + 1}`} className="max-w-2xl pb-6 text-base leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
