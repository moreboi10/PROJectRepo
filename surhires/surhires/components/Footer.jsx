import Link from "next/link";
import { Linkedin, Twitter, Instagram } from "lucide-react";

const columns = [
  { title: "Job seekers", links: [["Browse jobs", "/jobs"], ["How it works", "/#how-it-works"], ["Common questions", "/#faq"]] },
  { title: "Employers", links: [["Plans and pricing", "/employers"], ["Post a job", "/employers#post-job"], ["Success stories", "/#stories"]] },
];
const socials = [[Linkedin, "LinkedIn"], [Twitter, "Twitter"], [Instagram, "Instagram"]];

export default function Footer() {
  return (
    <footer className="on-dark bg-navy-950 text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-extrabold">Sur<span className="text-teal-bright">hires</span></p>
          <p className="mt-3 max-w-sm text-white/75">Surhires connects employers with job seekers through skill-based matching, so good people and good roles find each other faster.</p>
          <ul className="mt-5 flex gap-3">
            {socials.map(([Icon, name]) => (
              <li key={name}><a href="#" aria-label={`Surhires on ${name}`} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-navy-900"><Icon size={18} aria-hidden="true" /></a></li>
            ))}
          </ul>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="font-display text-base font-bold">{c.title}</h2>
            <ul className="mt-3 space-y-2">
              {c.links.map(([label, href]) => (
                <li key={label}><Link href={href} className="text-white/75 underline-offset-4 hover:text-white hover:underline">{label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="container-page border-t border-white/15 py-5 text-sm text-white/65">© {new Date().getFullYear()} Surhires. All rights reserved.</p>
    </footer>
  );
}
