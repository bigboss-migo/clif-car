import site from "@/config/site";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function ProcessPage() {
  return (
    <PlaceholderPage
      id="process"
      eyebrow="The Process"
      title="Process"
      text="Process page content coming soon."
      description="See how our auto brokerage process takes you from first call to keys in hand."
      image={site.heroImages.process}
    />
  );
}
