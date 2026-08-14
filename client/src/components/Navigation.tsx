import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { Menu, X, Youtube } from "lucide-react";

const CHANNEL_URL = "https://www.youtube.com/@justin_danger_nunley";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Archive", href: "/archive" },
    {
      label: "Merch",
      href: "#",
      placeholder: true,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        toast("Merch coming soon!", {
          description: "Justin's merch store is on the way. Stay tuned!",
        });
      },
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <span className="text-primary text-xs font-bold">JN</span>
          </div>
          <span className="font-display font-semibold text-foreground text-sm hidden sm:block">
            Did You Know?
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={link.onClick}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location === link.href && !link.placeholder
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              } ${link.placeholder ? "opacity-70" : ""}`}
            >
              {link.label}
              {link.placeholder && (
                <span className="ml-1.5 text-[10px] font-medium bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                  Soon
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Subscribe CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            <Youtube className="w-4 h-4" />
            Subscribe
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) link.onClick(e);
                  setMobileOpen(false);
                }}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                  location === link.href && !link.placeholder
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
                {link.placeholder && (
                  <span className="text-[10px] font-medium bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                )}
              </a>
            ))}
            <div className="pt-2 border-t border-border/50 mt-2">
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all w-full"
                onClick={() => setMobileOpen(false)}
              >
                <Youtube className="w-4 h-4" />
                Subscribe to @justin_danger_nunley
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
