import site from "@/config/site";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function CalculatorPage() {
  return (
    <PlaceholderPage
      id="calculator"
      eyebrow="Calculator"
      title="Calculator"
      text="Calculator page content coming soon."
      image={site.heroImages.calculator}
    />
  );
}
