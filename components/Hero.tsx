export function Hero() {
  return (
    <header className="mx-auto max-w-5xl px-5 pb-14 pt-7 text-center sm:px-8 sm:pb-20 sm:pt-9">
      <nav className="mb-20 flex items-center justify-between sm:mb-28" aria-label="Main navigation">
        <a href="#" className="font-serif text-2xl font-semibold tracking-tight">within<span className="text-moss">.</span></a>
        <a href="#analyzer" className="rounded-full border border-line bg-white/50 px-5 py-2.5 text-sm font-medium transition hover:border-moss">Start discovering</a>
      </nav>
      <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-moss">Content intelligence for creators</p>
      <h1 className="mx-auto max-w-4xl font-serif text-5xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-7xl lg:text-[5.4rem]">Your next digital product is already hidden in your content.</h1>
      <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-ink/65 sm:text-lg">Paste your posts, transcripts, articles, notes, or ideas. We analyze what you already know and uncover digital products your audience may actually want to buy.</p>
      <a href="#analyzer" className="mt-9 inline-flex rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-moss">Find My Product Ideas <span className="ml-3" aria-hidden>↓</span></a>
    </header>
  );
}
