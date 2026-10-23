import { Check } from "lucide-react";
import Button from "@/components/Button";
import PostJobForm from "@/components/PostJobForm";
import { PLANS, COMPARE } from "@/lib/data";

export const metadata = {
  title: "For employers: plans and pricing",
  description: "Compare Surhires plans from ₹2,999 a month and post your first job free for 30 days.",
  openGraph: { title: "Plans and pricing | Surhires", description: "Three plans for teams of every hiring size. First job post free." },
};

export default function EmployersPage() {
  return (
    <>
      <section className="section-pad pb-8" aria-labelledby="plans-title">
        <div className="container-page">
          <h1 id="plans-title" className="max-w-3xl text-4xl font-extrabold sm:text-5xl">Simple pricing for every hiring plan</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">Pay per month, cancel any time. Your first job post is free for 30 days.</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {PLANS.map((p) => (
              <article key={p.name} className={`flex flex-col rounded-card p-7 ${p.featured ? "on-dark bg-navy-900 text-white" : "border border-line bg-white"}`}>
                <h2 className="text-2xl font-bold">{p.name}{p.featured && <span className="ml-2 rounded-full bg-teal-bright px-2.5 py-0.5 align-middle text-xs font-bold text-navy-900">Most popular</span>}</h2>
                <p className={`mt-1 ${p.featured ? "text-white/80" : "text-muted"}`}>{p.blurb}</p>
                <p className="mt-5"><span className="font-display text-4xl font-extrabold">{p.price}</span> <span className={p.featured ? "text-white/75" : "text-muted"}>{p.cadence}</span></p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.features.map((f) => <li key={f} className="flex gap-2"><Check size={18} className={`mt-0.5 shrink-0 ${p.featured ? "text-teal-bright" : "text-teal"}`} aria-hidden="true" />{f}</li>)}
                </ul>
                <Button href="#post-job" variant={p.featured ? "light" : "dark"} className="mt-7">{p.cta}</Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="compare-title">
        <div className="container-page">
          <h2 id="compare-title" className="mb-6 text-3xl font-bold">Compare plans</h2>
          <div className="overflow-x-auto rounded-card border border-line bg-white">
            <table className="w-full min-w-[560px] text-left">
              <caption className="sr-only">Feature comparison of Surhires plans</caption>
              <thead className="bg-teal-soft">
                <tr>
                  <th scope="col" className="p-4">Feature</th>
                  {PLANS.map((p) => <th key={p.name} scope="col" className="p-4">{p.name}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {COMPARE.map(([feature, ...cells]) => (
                  <tr key={feature}>
                    <th scope="row" className="p-4 font-semibold">{feature}</th>
                    {cells.map((c, i) => <td key={i} className="p-4 text-muted">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="post-job" className="section-pad bg-teal-soft" aria-labelledby="post-title">
        <div className="container-page max-w-3xl">
          <h2 id="post-title" className="text-3xl font-bold sm:text-4xl">Post a job</h2>
          <p className="mb-8 mt-2 text-lg text-muted">Tell us about the role. We will send you matched candidates within 48 hours.</p>
          <PostJobForm />
        </div>
      </section>
    </>
  );
}
