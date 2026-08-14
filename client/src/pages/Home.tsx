import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import WelcomeScreen from "@/components/WelcomeScreen";
import FactCard from "@/components/FactCard";
import { Button } from "@/components/ui/button";
import { Youtube, RefreshCw, BookOpen } from "lucide-react";
import { Link } from "wouter";

const CHANNEL_URL = "https://www.youtube.com/@justin_danger_nunley";
const WELCOME_KEY = "justin_did_you_know_welcomed";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [displayedFact, setDisplayedFact] = useState<{ id: number; videoId: string; videoTitle: string; videoUrl: string; fact: string; displayOrder: number; createdAt: Date } | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isShowingDaily, setIsShowingDaily] = useState(true);

  // Show welcome screen once per user
  useEffect(() => {
    const welcomed = localStorage.getItem(WELCOME_KEY);
    if (!welcomed) {
      setShowWelcome(true);
    }
  }, []);

  const handleWelcomeClose = () => {
    localStorage.setItem(WELCOME_KEY, "true");
    setShowWelcome(false);
  };

  // Daily fact query
  const { data: dailyFact, isLoading: dailyLoading } = trpc.facts.daily.useQuery();

  // Random fact query (only fires when we request a shuffle)
  const { data: _randomFact, refetch: fetchRandom, isLoading: randomLoading } =
    trpc.facts.random.useQuery(
      { excludeId: displayedFact?.id },
      { enabled: false }
    );

  const { data: factCount } = trpc.facts.count.useQuery();

  // Initialize displayed fact from daily fact
  useEffect(() => {
    if (dailyFact && !displayedFact) {
      setDisplayedFact(dailyFact);
    }
  }, [dailyFact, displayedFact]);

  const displayFact = displayedFact ?? dailyFact;

  const handleGetAnother = async () => {
    setIsShuffling(true);
    const result = await fetchRandom();
    if (result.data) {
      setDisplayedFact(result.data);
      setIsShowingDaily(false);
    }
    setIsShuffling(false);
  };

  const isLoading = dailyLoading;

  return (
    <>
      {showWelcome && <WelcomeScreen onClose={handleWelcomeClose} />}

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
          </div>

          <div className="container relative">
            <div className="max-w-2xl mx-auto text-center mb-12">
              {/* Channel badge */}
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary/80 border border-border/60 rounded-full px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all mb-6"
              >
                <Youtube className="w-3.5 h-3.5 text-primary" />
                <span>@justin_danger_nunley</span>
              </a>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
                Listen,{" "}
                <span className="text-gradient">Did You Know?</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                A new fascinating fact from Justin Danger Nunley's YouTube Shorts, served fresh every day.
              </p>
            </div>

            {/* Daily Fact Card */}
            <div className="max-w-2xl mx-auto">
              {isLoading ? (
                <div className="card-glow bg-card rounded-2xl p-8 animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/3 mb-4" />
                  <div className="h-6 bg-muted rounded w-full mb-2" />
                  <div className="h-6 bg-muted rounded w-4/5 mb-2" />
                  <div className="h-6 bg-muted rounded w-3/5" />
                </div>
              ) : displayFact ? (
                <FactCard
                  fact={displayFact}
                  isDaily={isShowingDaily}
                />
              ) : (
                <div className="card-glow bg-card rounded-2xl p-8 text-center text-muted-foreground">
                  No facts available yet.
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
                <Button
                  onClick={handleGetAnother}
                  disabled={isShuffling || randomLoading}
                  variant="outline"
                  className="flex items-center gap-2 border-border/60 hover:border-primary/40 hover:text-primary transition-all"
                >
                  <RefreshCw className={`w-4 h-4 ${isShuffling ? "animate-spin" : ""}`} />
                  Get Another Fact
                </Button>

                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  <Youtube className="w-4 h-4" />
                  Subscribe on YouTube
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-8 border-t border-border/40">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="font-display text-3xl font-bold text-gradient">{factCount ?? 76}</div>
                <div className="text-sm text-muted-foreground mt-1">Facts Collected</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-gradient">Daily</div>
                <div className="text-sm text-muted-foreground mt-1">New Fact</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-gradient">100%</div>
                <div className="text-sm text-muted-foreground mt-1">From Justin's Shorts</div>
              </div>
            </div>
          </div>
        </section>

        {/* Archive CTA */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-xl mx-auto text-center bg-card card-glow rounded-2xl p-8">
              <BookOpen className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Browse All Facts
              </h2>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Explore the full archive of "Listen, did you know..." facts from Justin's Shorts — each one linked back to the original video.
              </p>
              <Link href="/archive">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  View Full Archive
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 py-8">
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="font-display">
              Listen, Did You Know?
            </div>
            <div className="flex items-center gap-4">
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Youtube className="w-4 h-4" />
                @justin_danger_nunley
              </a>
            </div>
            <div>Facts sourced from Justin's YouTube Shorts</div>
          </div>
        </footer>
      </div>
    </>
  );
}
