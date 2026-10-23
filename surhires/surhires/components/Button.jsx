import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-base font-semibold transition-colors active:translate-y-px disabled:pointer-events-none disabled:opacity-50";
const variants = {
  primary: "bg-teal text-white hover:bg-[#0B5F59]",
  dark: "bg-navy-900 text-white hover:bg-navy-700",
  outline: "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
  light: "bg-white text-navy-900 hover:bg-teal-soft",
  ghostLight: "border border-white/60 text-white hover:bg-white hover:text-navy-900",
};

export default function Button({ href, variant = "primary", className = "", children, ...props }) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (href) return <Link href={href} className={classes} {...props}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}
