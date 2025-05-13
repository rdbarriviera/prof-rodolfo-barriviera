"use client";

import { useTheme } from "../../hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border-2 border-[var(--toggleBorder)] cursor-pointer rounded-full bg-[var(--background)]  transition"
    >
      {theme === "dark" ? (
        <Sun className="text-yellow-500 h-4 w-4 md:h-6 md:w-6" />
      ) : (
        <Moon className="text-blue-700 h-4 w-4 md:h-6 md:w-6" />
      )}
    </button>
  );
}
