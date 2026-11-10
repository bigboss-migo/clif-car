import { Link } from "react-router-dom";
import site from "@/config/site";

const LOGO_URL = "https://imagedelivery.net/qPl4NOqbLb6xIvDbtIUFUw/85525cd5-b924-441d-e1d8-b95bfdee5700/public";

export const Logo = ({ testId = "logo" }) => (
  <Link to="/process" data-testid={testId} className="flex items-center" aria-label={site.brandName}>
    <img src={LOGO_URL} alt={site.brandName} className="h-10 w-auto md:h-12" />
  </Link>
);
