"use client";
import { useState } from "react";
import type { Opportunity } from "@/types/analysis";

export function ProductOpportunityCard({ opportunity, index }: { opportunity: Opportunity; index: number }) {
  const [notice, setNotice] = useState(false);
  const details = [["Audience problem", opportunity.audience_problem], ["The product", opportunity.product_concept], ["Ideal buyer", opportunity.ideal_buyer], ["Recommended format", opportunity.recommended_format], ["Why it fits your voice", opportunity.why_it_fits]];
  return <article className="flex h-full flex-col rounded-2xl border border-line bg-[#fffdf8] p-6 shadow-card sm:p-8">
    <div className="flex items-start justify-between gap-4"><span className="text-xs font-semibold uppercase tracking-[.18em] text-moss">Opportunity 0{index + 1}</span><div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full border border-line"><strong className="text-lg leading-none">{opportunity.opportunity_score}</strong><span className="mt-1 text-[9px] uppercase tracking-wide text-ink/50">score</span></div></div>
    <h3 className="mt-5 font-serif text-3xl font-medium leading-tight tracking-tight">{opportunity.name}</h3><p className="mt-3 text-sm leading-6 text-ink/65">{opportunity.hook}</p>
    <dl className="mt-7 flex-1 space-y-5 border-t border-line pt-6">{details.map(([label, value]) => <div key={label}><dt className="mb-1 text-[10px] font-bold uppercase tracking-[.15em] text-ink/45">{label}</dt><dd className="text-sm leading-6">{value}</dd></div>)}</dl>
    <div className="mt-7 flex items-center justify-between border-t border-line pt-6"><div><span className="block text-[10px] font-bold uppercase tracking-[.15em] text-ink/45">Suggested price</span><strong className="mt-1 block font-serif text-xl">{opportunity.suggested_price}</strong></div><button onClick={() => { setNotice(true); setTimeout(() => setNotice(false), 3000); }} className="rounded-full bg-ink px-5 py-3 text-xs font-semibold text-white transition hover:bg-moss">Build This Product</button></div>
    <p className={`mt-3 text-right text-xs text-moss transition-opacity ${notice ? "opacity-100" : "opacity-0"}`} aria-live="polite">Product Builder coming in Milestone 2.</p>
  </article>;
}
