import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun, TrendingUp, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface HeaderProps {
  currentView: "leads" | "opportunities";
  onViewChange: (view: "leads" | "opportunities") => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold lg:h-8 lg:w-8">
            MS
          </span>
          <h1 className="hidden font-bold lg:block lg:text-xl">Mini-Seller</h1>
        </div>

        <nav className="flex items-center gap-4 lg:gap-4 lg:mr-20">
          <Button
            variant={currentView === "leads" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("leads")}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4 lg:h-4 lg:w-4" />
            Leads
          </Button>
          <Button
            variant={currentView === "opportunities" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("opportunities")}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4 lg:h-4 lg:w-4" />
            Opportunities
          </Button>
        </nav>

        <div>
          <Toggle
            pressed={isDark}
            onPressedChange={toggleTheme}
            aria-label="Toggle theme"
            variant="outline"
            className="rounded-lg"
          >
            {isDark ? (
              <Sun className="h-8 w-8 lg:h-8 lg:w-8" />
            ) : (
              <Moon className="h-8 w-8 lg:h-8 lg:w-8" />
            )}
          </Toggle>
        </div>
      </div>
    </header>
  );
}
