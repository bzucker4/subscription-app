export function LoadingState() {
  return <div className="flex min-h-80 flex-col items-center justify-center text-center" role="status"><div className="relative mb-7 h-12 w-12"><div className="absolute inset-0 rounded-full border border-line"/><div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-moss"/></div><p className="font-serif text-2xl">Reading between the lines…</p><p className="mt-2 text-sm text-ink/55">Finding patterns, tensions, and product-worthy ideas.</p></div>;
}
