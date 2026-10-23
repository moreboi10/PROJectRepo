import { MapPin, Briefcase } from "lucide-react";

export default function JobCard({ job }) {
  return (
    <article className="flex flex-col rounded-card border border-line bg-white p-5 transition-shadow hover:shadow-lg">
      <p className="text-sm font-medium text-teal">{job.role} · {job.posted}</p>
      <h3 className="mt-1 text-xl font-bold">{job.title}</h3>
      <p className="text-muted">{job.company}</p>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
        <li className="flex items-center gap-1.5"><MapPin size={15} aria-hidden="true" />{job.location}</li>
        <li className="flex items-center gap-1.5"><Briefcase size={15} aria-hidden="true" />{job.type}</li>
      </ul>
      <p className="mt-4 font-semibold">{job.salary}</p>
      <a href="#" className="mt-5 inline-block rounded-lg border border-navy-900 px-4 py-2 text-center text-sm font-semibold transition-colors hover:bg-navy-900 hover:text-white">
        View role<span className="sr-only"> {job.title} at {job.company}</span>
      </a>
    </article>
  );
}
