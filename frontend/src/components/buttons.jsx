import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const base =
  "inline-block px-7 py-3.5 text-center text-xs font-bold uppercase tracking-[0.2em] transition-[opacity,color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const buttonVariants = {
  primary: cn(base, "bg-primary text-primary-foreground hover:opacity-85"),
  secondary: cn(base, "border border-foreground text-foreground hover:border-primary hover:text-primary"),
};

const ButtonBase = ({ variant, to, href, className, children, ...props }) => {
  const cls = cn(buttonVariants[variant], className);
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...props}>{children}</a>;
  return <button type="button" className={cls} {...props}>{children}</button>;
};

export const PrimaryButton = (props) => <ButtonBase variant="primary" {...props} />;

export const SecondaryButton = (props) => <ButtonBase variant="secondary" {...props} />;
