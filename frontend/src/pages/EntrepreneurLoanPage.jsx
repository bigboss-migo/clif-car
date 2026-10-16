import site from "@/config/site";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function EntrepreneurLoanPage() {
  return (
    <PlaceholderPage
      id="entrepreneur-loan"
      eyebrow="Entrepreneur Loan"
      title="Entrepreneur Loan"
      text="Entrepreneur loan page content coming soon."
      description="Vehicle financing options built for entrepreneurs and self-employed buyers."
      image={site.heroImages.entrepreneurLoan}
    />
  );
}
