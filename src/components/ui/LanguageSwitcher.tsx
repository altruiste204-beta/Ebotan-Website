"use client";

import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/components/ui/LocaleProvider";
import { locales, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const labels: Record<Locale, string> = { fr: "Français", en: "English" };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-ebo-green hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-ebo-lime transition-colors"
        aria-label="Changer de langue"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase">{locale}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl shadow-black/10 border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
          >
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  l === locale
                    ? "bg-ebo-green/10 text-ebo-green dark:bg-ebo-lime/10 dark:text-ebo-lime font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {labels[l]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
