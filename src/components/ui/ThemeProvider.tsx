"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("ebotan-theme") as Theme | null;
    if (saved) {
      setThemeState(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = theme === "dark" || (theme === "system" && systemDark);

    setResolvedTheme(isDark ? "dark" : "light");

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("ebotan-theme", theme);
  }, [theme, mounted]);

  const setTheme = (t: Theme) => setThemeState(t);

  const toggleTheme = () => {
    setThemeState((prev) => {
      if (prev === "dark") return "light";
      if (prev === "light") return "dark";
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return systemDark ? "light" : "dark";
    });
  };

  // Prevent flash
  if (!mounted) {
    return (
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem("ebotan-theme") || "system";
                const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const isDark = theme === "dark" || (theme === "system" && systemDark);
                if (isDark) document.documentElement.classList.add("dark");
              })();
            `,
          }}
        />
        {children}
      </>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
