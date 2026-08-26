const steps = ["Paste your content.", "We uncover patterns, problems, and opportunities.", "Choose the product worth building."];
export function HowItWorks() {
  return <section className="border-y border-line bg-sand/40 px-5 py-20 sm:px-8"><div className="mx-auto max-w-6xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-moss">How it works</p><div className="mt-10 grid gap-10 md:grid-cols-3">{steps.map((step, i) => <div key={step} className="border-t border-line pt-5"><span className="font-serif text-lg italic text-moss">0{i + 1}</span><h2 className="mt-5 max-w-xs font-serif text-2xl leading-tight">{step}</h2></div>)}</div></div></section>;
}
