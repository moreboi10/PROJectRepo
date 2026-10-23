import JobsBrowser from "@/components/JobsBrowser";

export const metadata = {
  title: "Browse jobs",
  description: "Filter open roles by function, location and job type. Every listing shows the salary range and the hiring company.",
  openGraph: { title: "Browse jobs | Surhires", description: "Open roles across engineering, design, sales, marketing and more." },
};

export default function JobsPage() {
  return (
    <div className="section-pad">
      <div className="container-page">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Find your next role</h1>
        <p className="mt-3 mb-8 max-w-2xl text-lg text-muted">Filter by what matters to you. Every role shows pay upfront.</p>
        <JobsBrowser />
      </div>
    </div>
  );
}
