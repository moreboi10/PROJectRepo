"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import Button from "./Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const linkClass = (href) =>
    `rounded-md px-3 py-2 text-[15px] font-medium transition-colors hover:bg-teal-soft ${pathname === href ? "text-teal" : "text-navy-900"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-2xl font-extrabold tracking-tight" aria-label="Surhires home">
          Sur<span className="text-teal">hires</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)} aria-current={pathname === l.href ? "page" : undefined}>{l.label}</Link>
          ))}
        </nav>

        <div className="hidden lg:block"><Button href="/employers#post-job" className="py-2.5">Post a job</Button></div>

        <button
          type="button"
          className="rounded-md p-2 hover:bg-teal-soft lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-paper lg:hidden">
          <ul className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} className={`block ${linkClass(l.href)} py-3 text-lg`}>{l.label}</Link></li>
            ))}
            <li className="pt-2"><Button href="/employers#post-job" className="w-full">Post a job</Button></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
