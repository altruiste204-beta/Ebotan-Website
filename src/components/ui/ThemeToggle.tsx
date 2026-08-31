"use client";

import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 hover:text-ebo-green hover:bg-gray-100 dark:hover:bg-white/10 dark:text-gray-300 dark:hover:text-ebo-lime transition-colors"
      aria-label="Changer de thème"
    >
      <AnimatePresence mode="wait" initial={false}>
        {resolvedTheme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
