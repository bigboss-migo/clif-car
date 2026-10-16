import site from "@/config/site";
import { Eyebrow } from "@/components/Eyebrow";
import { Highlight } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { comparisonRows } from "@/pages/process/processContent";

const cell = "px-5 py-4 text-left align-top text-sm";

export const Comparison = () => (
  <Section data-testid="process-comparison">
    <Eyebrow>The difference</Eyebrow>
    <h2 className="mt-4 text-3xl md:text-5xl">
      Dealership vs <Highlight>{site.brandName}</Highlight>
    </h2>
    <p className="mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground md:hidden">Swipe to compare →</p>
    <div className="mt-3 overflow-x-auto border border-border md:mt-12" data-testid="comparison-table-wrapper">
      <table className="w-full min-w-[680px] border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className={`${cell} w-[22%]`}><span className="sr-only">Category</span></th>
            <th scope="col" className={`${cell} text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground`}>
              Walking into a dealership
            </th>
            <th scope="col" className={`${cell} border-l-2 border-primary bg-ink text-xs font-bold uppercase tracking-[0.16em] text-primary`}>
              Working with {site.brandName}
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((r) => (
            <tr key={r.label} className="border-b border-border last:border-b-0">
              <th scope="row" className={`${cell} text-xs font-bold uppercase tracking-[0.16em]`}>{r.label}</th>
              <td className={`${cell} text-muted-foreground`}>{r.dealer}</td>
              <td className={`${cell} border-l-2 border-primary bg-primary/10 font-semibold text-foreground`}>{r.us}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Section>
);
