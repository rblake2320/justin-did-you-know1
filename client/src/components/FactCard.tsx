import { useState } from "react";
import { ExternalLink, Share2, Check, Play, Calendar } from "lucide-react";
import { toast } from "sonner";
import type { Fact } from "../../../drizzle/schema";

interface FactCardProps {
  fact: Fact;
  isDaily?: boolean;
  compact?: boolean;
}

export default function FactCard({ fact, isDaily = false, compact = false }: FactCardProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareText = `Listen, did you know... ${fact.fact}\n\nWatch the full video: ${fact.videoUrl}\n\nVia @justin_danger_nunley`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Listen, Did You Know?",
          text: shareText,
          url: fact.videoUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      // Clipboard fallback
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        toast("Copied to clipboard!", {
          description: "Share this fact with your friends.",
        });
        setTimeout(() => setCopied(false), 2500);
      } catch {
        toast.error("Could not copy to clipboard.");
      }
    }
  };

  if (compact) {
    return (
      <div className="card-glow card-glow-hover bg-card rounded-xl p-5 flex flex-col gap-3 transition-all duration-300">
        {/* Label */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">
            Listen, did you know...
          </span>
        </div>

        {/* Fact text */}
        <p className="text-foreground text-sm leading-relaxed line-clamp-3">
          {fact.fact}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-border/40">
          <p className="text-muted-foreground text-xs truncate max-w-[60%]">{fact.videoTitle}</p>
          <a
            href={fact.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-medium shrink-0"
          >
            <Play className="w-3 h-3" />
            Watch
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="card-glow card-glow-hover bg-card rounded-2xl p-8 transition-all duration-300 relative overflow-hidden">
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />

      {/* Daily badge */}
      {isDaily && (
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-1.5 bg-primary/15 border border-primary/30 rounded-full px-3 py-1">
            <Calendar className="w-3 h-3 text-primary" />
            <span className="text-xs font-semibold text-primary">Today's Fact</span>
          </div>
        </div>
      )}

      {/* Lead-in label */}
      <div className="mb-4">
        <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
          Listen, did you know...
        </span>
      </div>

      {/* Fact text */}
      <blockquote className="font-display text-xl sm:text-2xl text-foreground leading-relaxed font-medium mb-6">
        "{fact.fact}"
      </blockquote>

      {/* Video source */}
      <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl border border-border/40 mb-6">
        <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
          <Play className="w-3.5 h-3.5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground mb-0.5">From the video</p>
          <p className="text-sm text-foreground font-medium truncate">{fact.videoTitle}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <a
          href={fact.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 flex-1 justify-center bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
        >
          <ExternalLink className="w-4 h-4" />
          Watch the Full Short
        </a>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          aria-label="Share this fact"
        >
          {copied ? (
            <Check className="w-4 h-4 text-primary" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
          {copied ? "Copied!" : "Share"}
        </button>
      </div>
    </div>
  );
}
