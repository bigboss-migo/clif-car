import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/85",
  secondary: "border-2 border-current bg-transparent hover:bg-foreground/10",
};

const ButtonBase = ({ variant, to, href, className = "", children, ...props }) => {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...props}>{children}</a>;
  return <button type="button" className={cls} {...props}>{children}</button>;
};

export const PrimaryButton = (props) => <ButtonBase variant="primary" {...props} />;

export const SecondaryButton = (props) => <ButtonBase variant="secondary" {...props} />;
