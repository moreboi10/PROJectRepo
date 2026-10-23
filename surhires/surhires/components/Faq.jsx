"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function Faq({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="divide-y divide-line rounded-card border border-line bg-white">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-lg font-semibold transition-colors hover:bg-teal-soft"
              >
                {item.q}
                <Plus aria-hidden="true" className={`shrink-0 text-teal transition-transform ${open ? "rotate-45" : ""}`} />
              </button>
            </h3>
            <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} hidden={!open} className="px-5 pb-5 text-muted">
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
