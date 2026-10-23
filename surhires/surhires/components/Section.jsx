export default function Section({ id, title, intro, tone = "light", children }) {
  const bg = tone === "dark" ? "bg-navy-900 text-white on-dark" : tone === "soft" ? "bg-teal-soft" : "";
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={`section-pad ${bg}`}>
      <div className="container-page">
        {title && (
          <div className="mb-10 max-w-2xl">
            <h2 id={id ? `${id}-title` : undefined} className="text-3xl font-bold sm:text-4xl">{title}</h2>
            {intro && <p className={`mt-3 text-lg ${tone === "dark" ? "text-white/80" : "text-muted"}`}>{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
