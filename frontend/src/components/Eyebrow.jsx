export const Eyebrow = ({ children, className = "", ...props }) => (
  <p className={`eyebrow text-xs font-semibold uppercase tracking-[0.2em] text-primary ${className}`} {...props}>
    {children}
  </p>
);
