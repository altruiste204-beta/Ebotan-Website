"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLocale } from "@/components/ui/LocaleProvider";
import { getTranslations } from "@/lib/i18n";

export function Navbar() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  const navLinks = [
    { href: "#accueil", label: t.nav.accueil },
    { href: "#produits", label: t.nav.produits },
    { href: "#services", label: t.nav.services },
    { href: "#tarifs", label: t.nav.tarifs },
    { href: "#contact", label: t.nav.contact },
    { href: "#autres", label: t.nav.autres },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setHidden(currentY > lastScrollY && currentY > 300);
      setLastScrollY(currentY);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= currentY + 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, navLinks]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
          scrolled
            ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a href="#accueil" onClick={(e) => handleClick(e, "#accueil")} className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Ebotan"
                width={140}
                height={42}
                className="h-9 w-auto lg:h-10"
                priority
              />
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={cn(
                    "relative text-sm font-medium tracking-wide transition-colors duration-200 py-1",
                    activeSection === link.href.replace("#", "")
                      ? "text-ebo-green dark:text-ebo-lime"
                      : "text-gray-600 dark:text-gray-400 hover:text-ebo-green dark:hover:text-ebo-lime"
                  )}
                >
                  {link.label}
                  {activeSection === link.href.replace("#", "") && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-ebo-green dark:bg-ebo-lime rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            {/* Mobile toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitcher />
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-gray-800 dark:text-gray-200"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40" onClick={() => setMobileOpen(false)} />
            <motion.div className="absolute right-0 top-0 h-full w-[280px] bg-white dark:bg-gray-900 shadow-2xl pt-20 px-6">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "py-3 px-4 rounded-lg text-base font-medium transition-colors",
                      activeSection === link.href.replace("#", "")
                        ? "bg-ebo-green/10 text-ebo-green dark:bg-ebo-lime/10 dark:text-ebo-lime"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
