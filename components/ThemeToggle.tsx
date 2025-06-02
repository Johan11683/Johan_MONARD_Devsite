"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = stored || "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const setAndApplyTheme = (t: "light" | "dark") => {
    setTheme(t);
    localStorage.setItem("theme", t);
    document.documentElement.classList.toggle("dark", t === "dark");
  };

  return (
    <div className="toggle-group theme-toggle">
      <button
        onClick={() => setAndApplyTheme("light")}
        className={theme === "light" ? "active" : ""}
      >
        ☀️
      </button>
      <button
        onClick={() => setAndApplyTheme("dark")}
        className={theme === "dark" ? "active" : ""}
      >
        🌙
      </button>
    </div>
  );
}
