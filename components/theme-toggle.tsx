"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is only known in the browser, so render a neutral button until mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative grid size-11 place-items-center rounded-full border border-line bg-surface/60 text-ink backdrop-blur-md transition duration-300 ease-glide hover:border-violet hover:text-violet"
    >
      <Sun
        aria-hidden="true"
        className={`absolute size-[1.15rem] transition duration-500 ease-glide ${
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        aria-hidden="true"
        className={`absolute size-[1.15rem] transition duration-500 ease-glide ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}
