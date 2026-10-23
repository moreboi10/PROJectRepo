"use client";
import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import JobCard from "./JobCard";
import Button from "./Button";
import { JOBS, ROLES, LOCATIONS, TYPES } from "@/lib/data";

const empty = { role: "", location: "", type: "" };

function Select({ id, label, value, options, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
      <select id={id} className="field" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function JobsBrowser() {
  const [filters, setFilters] = useState(empty);
  const set = (key) => (value) => setFilters((f) => ({ ...f, [key]: value }));

  const results = useMemo(
    () => JOBS.filter((j) => (!filters.role || j.role === filters.role) && (!filters.location || j.location === filters.location) && (!filters.type || j.type === filters.type)),
    [filters]
  );

  return (
    <>
      <form role="search" aria-label="Filter jobs" onSubmit={(e) => e.preventDefault()} className="grid gap-4 rounded-card border border-line bg-white p-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        <Select id="role" label="Role" value={filters.role} options={ROLES} onChange={set("role")} />
        <Select id="location" label="Location" value={filters.location} options={LOCATIONS} onChange={set("location")} />
        <Select id="type" label="Job type" value={filters.type} options={TYPES} onChange={set("type")} />
        <Button type="button" variant="outline" onClick={() => setFilters(empty)} disabled={!filters.role && !filters.location && !filters.type}>Clear filters</Button>
      </form>

      <p className="mt-6 text-muted" aria-live="polite">{results.length} {results.length === 1 ? "role" : "roles"} found</p>

      {results.length ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{results.map((j) => <JobCard key={j.id} job={j} />)}</div>
      ) : (
        <div className="mt-4 rounded-card border border-dashed border-navy-700/40 bg-white px-6 py-14 text-center">
          <SearchX className="mx-auto text-teal" size={40} aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-bold">No roles match these filters</h2>
          <p className="mx-auto mt-2 max-w-md text-muted">Try a different location or job type, or clear the filters to see every open role.</p>
          <Button type="button" className="mt-6" onClick={() => setFilters(empty)}>Show all roles</Button>
        </div>
      )}
    </>
  );
}
