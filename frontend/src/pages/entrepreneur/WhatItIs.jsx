import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";
import { whatItIs } from "@/pages/entrepreneur/content";

export const WhatItIs = () => (
  <Section data-testid="entrepreneur-what-it-is">
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div>
        <Eyebrow>What it is</Eyebrow>
        <h2 className="mt-4 text-3xl md:text-5xl">Financing that reads the whole business</h2>
      </div>
      <div className="space-y-5">
        {whatItIs.map((p, i) => (
          <p key={i} className={i === 0 ? "text-lg leading-relaxed" : "leading-relaxed text-muted-foreground"}>
            {p}
          </p>
        ))}
      </div>
    </div>
  </Section>
);
