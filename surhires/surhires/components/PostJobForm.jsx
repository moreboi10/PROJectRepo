"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "./Button";
import { TYPES, LOCATIONS } from "@/lib/data";

const initial = { company: "", email: "", title: "", location: "", type: "", description: "" };

function validate(v) {
  const e = {};
  if (!v.company.trim()) e.company = "Enter your company name.";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid work email, like name@company.com.";
  if (!v.title.trim()) e.title = "Enter the job title.";
  if (!v.location) e.location = "Choose a location.";
  if (!v.type) e.type = "Choose a job type.";
  if (v.description.trim().length < 30) e.description = "Describe the role in at least 30 characters.";
  return e;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}

export default function PostJobForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const bind = (id) => ({
    id,
    value: values[id],
    className: "field",
    "aria-invalid": errors[id] ? "true" : undefined,
    "aria-describedby": errors[id] ? `${id}-error` : undefined,
    onChange: (e) => setValues((v) => ({ ...v, [id]: e.target.value })),
  });

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) setDone(true);
    else document.getElementById(Object.keys(found)[0])?.focus();
  };

  if (done) {
    return (
      <div role="status" className="rounded-card border border-teal/40 bg-teal-soft p-8 text-center">
        <CheckCircle2 className="mx-auto text-teal" size={44} aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-bold">“{values.title}” is submitted</h3>
        <p className="mx-auto mt-2 max-w-md text-muted">We sent a confirmation to {values.email}. Your first matched candidates will appear within 48 hours.</p>
        <Button type="button" variant="outline" className="mt-6" onClick={() => { setValues(initial); setDone(false); }}>Post another job</Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="grid gap-5 rounded-card border border-line bg-white p-6 sm:grid-cols-2 sm:p-8">
      <Field id="company" label="Company name" error={errors.company}><input type="text" autoComplete="organization" {...bind("company")} /></Field>
      <Field id="email" label="Work email" error={errors.email}><input type="email" autoComplete="email" {...bind("email")} /></Field>
      <Field id="title" label="Job title" error={errors.title}><input type="text" {...bind("title")} /></Field>
      <Field id="location" label="Location" error={errors.location}>
        <select {...bind("location")}><option value="">Select</option>{LOCATIONS.map((l) => <option key={l}>{l}</option>)}</select>
      </Field>
      <Field id="type" label="Job type" error={errors.type}>
        <select {...bind("type")}><option value="">Select</option>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
      </Field>
      <div className="sm:col-span-2">
        <Field id="description" label="Role description" error={errors.description}><textarea rows={5} {...bind("description")} /></Field>
      </div>
      <div className="sm:col-span-2"><Button type="submit">Submit job post</Button></div>
    </form>
  );
}
