import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Faq from "@/components/Faq";
import JobCard from "@/components/JobCard";
import { JOBS, EMPLOYERS, STEPS, TESTIMONIALS, FAQS } from "@/lib/data";

export const metadata = {
  title: "Surhires | Hire faster, get hired sooner",
  description: "Post a job and see a skill-matched shortlist in 48 hours, or browse verified roles with salary ranges shown upfront.",
  openGraph: { title: "Surhires | Hire faster, get hired sooner", description: "Skill-based matching for employers and job seekers across India." },
};

function MatchCard() {
  return (
    <div className="hero-rise-delay rounded-card border border-line bg-white p-5 shadow-xl" aria-hidden="true">
      <p className="text-sm font-medium text-muted">Top match for Senior Backend Engineer</p>
      <div className="mt-3 flex items-center gap-3">
        <Image src="/avatar-rk.svg" alt="" width={48} height={48} className="rounded-full" />
        <div><p className="font-bold">Rohan K.</p><p className="text-sm text-muted">6 yrs · Go, PostgreSQL · Pune</p></div>
        <span className="ml-auto rounded-full bg-teal-soft px-3 py-1 text-sm font-bold text-teal">94% match</span>
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {["Skills match 9 of 10 requirements", "Available in 30 days", "Salary expectation within your band"].map((t) => (
          <li key={t} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-teal" />{t}</li>
        ))}
      </ul>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="section-pad pb-14 sm:pb-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="hero-rise">
            <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-6xl">Hire faster. Get hired sooner.</h1>
            <p className="mt-5 max-w-xl text-lg text-muted">Surhires ranks candidates and roles by real skills, so employers see a shortlist in 48 hours and job seekers see salaries before they apply.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/employers#post-job">Hire faster</Button>
              <Button href="/jobs" variant="outline">Find a job</Button>
            </div>
            <p className="mt-5 text-sm text-muted">Free for job seekers. First job post free for 30 days.</p>
          </div>
          <MatchCard />
        </div>
      </section>

      <section aria-label="Employers hiring on Surhires" className="border-y border-line bg-white py-8">
        <div className="container-page">
          <p className="text-center text-sm font-medium text-muted">Trusted by hiring teams at</p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {EMPLOYERS.map((e) => <li key={e} className="font-display text-xl font-bold text-navy-700/70">{e}</li>)}
          </ul>
        </div>
      </section>

      <Section id="how-it-works" title="From job post to offer in three steps" intro="No keyword stuffing, no inbox of 400 résumés.">
        <ol className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-card border border-line bg-white p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-navy-900 font-display font-bold text-white" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="featured-roles" tone="soft" title="Featured roles this week" intro="Every listing shows the salary range and hiring company.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {JOBS.slice(0, 6).map((j) => <JobCard key={j.id} job={j} />)}
        </div>
        <div className="mt-8"><Button href="/jobs" variant="dark">See all open roles</Button></div>
      </Section>

      <Section id="stories" title="What hiring looks like on Surhires">
        <ul className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li key={t.name}>
              <figure className="flex h-full flex-col rounded-card border border-line bg-white p-6">
                <blockquote className="flex-1 text-lg">“{t.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <Image src={t.avatar} alt={`Portrait initials of ${t.name}`} width={44} height={44} className="rounded-full" />
                  <span><span className="block font-bold">{t.name}</span><span className="text-sm text-muted">{t.title}</span></span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="faq" title="Common questions">
        <div className="max-w-3xl"><Faq items={FAQS} /></div>
      </Section>

      <section aria-labelledby="cta-title" className="on-dark bg-navy-900 py-16 text-white">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 id="cta-title" className="text-3xl font-bold sm:text-4xl">Your next hire or next job is on Surhires.</h2>
            <p className="mt-2 text-white/80">Start in under ten minutes. No card needed.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/employers#post-job" variant="light">Post a job</Button>
            <Button href="/jobs" variant="ghostLight">Browse jobs</Button>
          </div>
        </div>
      </section>
    </>
  );
}
