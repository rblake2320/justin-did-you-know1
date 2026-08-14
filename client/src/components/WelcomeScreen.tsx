import { useState } from "react";
import { Youtube, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHANNEL_URL = "https://www.youtube.com/@justin_danger_nunley";

interface WelcomeScreenProps {
  onClose: () => void;
}

export default function WelcomeScreen({ onClose }: WelcomeScreenProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/90 backdrop-blur-xl"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-card card-glow rounded-3xl p-8 sm:p-10 max-w-lg w-full transition-all duration-300 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          aria-label="Close welcome screen"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Decorative top accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-3">
          Welcome!
        </h2>

        <p className="text-center text-muted-foreground text-sm mb-6 leading-relaxed">
          You've discovered <span className="text-foreground font-semibold">Listen, Did You Know?</span> — a daily dose of fascinating facts, straight from{" "}
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            @justin_danger_nunley
          </a>
          's YouTube Shorts.
        </p>

        {/* Feature list */}
        <div className="space-y-3 mb-8">
          {[
            { emoji: "🎯", text: "A brand new \"Listen, did you know...\" fact every single day" },
            { emoji: "▶️", text: "Every fact links directly back to Justin's original Short" },
            { emoji: "📚", text: "Browse the full archive of facts anytime you want" },
            { emoji: "📤", text: "Share your favorite facts with friends in one tap" },
          ].map((item) => (
            <div key={item.text} className="flex items-start gap-3 bg-secondary/40 rounded-xl px-4 py-3">
              <span className="text-base shrink-0">{item.emoji}</span>
              <span className="text-sm text-foreground/80 leading-snug">{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleClose}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 rounded-xl text-sm"
          >
            Start Exploring
          </Button>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground px-4 py-3 rounded-xl text-sm font-medium transition-all"
          >
            <Youtube className="w-4 h-4 text-primary" />
            Visit Justin's Channel
          </a>
        </div>
      </div>
    </div>
  );
}
