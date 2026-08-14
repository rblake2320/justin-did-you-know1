import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import FactCard from "@/components/FactCard";
import { Search, Youtube, BookOpen } from "lucide-react";

const CHANNEL_URL = "https://www.youtube.com/@justin_danger_nunley";

export default function Archive() {
  const [search, setSearch] = useState("");

  const { data: facts, isLoading } = trpc.facts.list.useQuery();

  const filtered = useMemo(() => {
    if (!facts) return [];
    if (!search.trim()) return facts;
    const q = search.toLowerCase();
    return facts.filter(
      (f) =>
        f.fact.toLowerCase().includes(q) ||
        f.videoTitle.toLowerCase().includes(q)
    );
  }, [facts, search]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-10 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-1/4 w-72 h-72 bg-primary/4 rounded-full blur-3xl" />
        </div>
        <div className="container relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Fact Archive
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Every "Listen, did you know..." fact from Justin's Shorts, all in one place.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search facts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-card border border-border/60 rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facts Grid */}
      <section className="pb-16 px-4">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="card-glow bg-card rounded-xl p-5 animate-pulse"
                >
                  <div className="h-3 bg-muted rounded w-1/3 mb-3" />
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-4/5 mb-2" />
                  <div className="h-4 bg-muted rounded w-3/5" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No facts found
              </h3>
              <p className="text-muted-foreground text-sm">
                Try a different search term.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {search
                    ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"`
                    : `${filtered.length} facts total`}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((fact) => (
                  <FactCard key={fact.id} fact={fact} compact />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-12 border-t border-border/40">
        <div className="container">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Want more facts like these?
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Subscribe to Justin's YouTube channel and never miss a new "Listen, did you know..." moment.
            </p>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              <Youtube className="w-4 h-4" />
              Subscribe to @justin_danger_nunley
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="font-display">Listen, Did You Know?</div>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Youtube className="w-4 h-4" />
            @justin_danger_nunley
          </a>
          <div>Facts sourced from Justin's YouTube Shorts</div>
        </div>
      </footer>
    </div>
  );
}
