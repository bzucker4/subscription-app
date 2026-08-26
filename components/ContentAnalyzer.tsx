"use client";
import { FormEvent, useState } from "react";
import type { Analysis } from "@/types/analysis";
import { LoadingState } from "./LoadingState";
import { ProductOpportunityCard } from "./ProductOpportunityCard";

const MIN = 500, MAX = 40000;
export function ContentAnalyzer() {
  const [content, setContent] = useState(""); const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const valid = content.trim().length >= MIN && content.length <= MAX;
  async function submit(e: FormEvent) { e.preventDefault(); if (!valid || loading) return; setLoading(true); setError(""); setAnalysis(null);
    try { const res = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }) }); const data = await res.json(); if (!res.ok) throw new Error(data.error || "Something went wrong."); setAnalysis(data); setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 100); }
    catch (err) { setError(err instanceof Error ? err.message : "We couldn’t complete the analysis. Please try again."); } finally { setLoading(false); }
  }
  return <><section id="analyzer" className="px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-4xl"><div className="mb-9 text-center"><p className="text-xs font-semibold uppercase tracking-[.2em] text-moss">Your source material</p><h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Show us what you already know.</h2></div>
    <form onSubmit={submit} className="rounded-2xl border border-line bg-[#fffdf8] p-4 shadow-card sm:p-7"><label htmlFor="creator-content" className="sr-only">Your existing creator content</label><textarea id="creator-content" value={content} onChange={e => setContent(e.target.value.slice(0, MAX))} maxLength={MAX} rows={13} className="w-full resize-y bg-transparent p-2 text-base leading-7 outline-none sm:p-3" placeholder="Paste your existing content here. This can include social posts, video transcripts, newsletters, articles, notes, or anything else you have created." aria-describedby="content-help content-error" />
    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-line px-2 pt-4 text-xs text-ink/50"><p id="content-help">Your content is used only to generate your analysis.</p><p className={content.length > 0 && content.trim().length < MIN ? "text-amber-700" : ""}>{content.length.toLocaleString()} / {MAX.toLocaleString()} characters</p></div>
    {content.length > 0 && content.trim().length < MIN && <p className="mt-3 px-2 text-xs text-amber-700">Add at least {(MIN - content.trim().length).toLocaleString()} more characters for a useful analysis.</p>}
    {error && <p id="content-error" role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
    <button disabled={!valid || loading} className="mt-6 w-full rounded-xl bg-ink px-6 py-4 text-sm font-semibold text-white transition hover:bg-moss disabled:cursor-not-allowed disabled:opacity-35">{loading ? "Analyzing your content…" : "Analyze My Content"}</button></form></div></section>
    {(loading || analysis) && <section id="results" className="border-t border-line bg-sand/30 px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-7xl">{loading ? <LoadingState /> : analysis && <><div className="mx-auto mb-12 max-w-2xl text-center"><p className="text-xs font-semibold uppercase tracking-[.2em] text-moss">Your opportunities</p><h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Three ideas rooted in your work.</h2><p className="mt-4 text-sm leading-6 text-ink/60">Built from your recurring themes: {analysis.creator_summary.main_topics.slice(0, 3).join(", ")}.</p></div><div className="grid items-stretch gap-6 lg:grid-cols-3">{analysis.opportunities.map((o, i) => <ProductOpportunityCard key={`${o.name}-${i}`} opportunity={o} index={i} />)}</div></>}</div></section>}</>;
}
