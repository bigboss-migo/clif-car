import { Link } from "react-router-dom";
import site from "@/config/site";

const LOGO_URL = "https://imagedelivery.net/qPl4NOqbLb6xIvDbtIUFUw/dd7a761d-6cc1-4452-c4d2-9163fb414800/public";

export const Logo = ({ testId = "logo" }) => (
  <Link to="/process" data-testid={testId} className="flex items-center" aria-label={site.brandName}>
    <img src={LOGO_URL} alt={site.brandName} className="h-10 w-auto md:h-12" />
  </Link>
);
