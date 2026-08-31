"use client";

import { motion } from "framer-motion";
import { Leaf, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useLocale } from "@/components/ui/LocaleProvider";
import { getTranslations } from "@/lib/i18n";

export function Hero() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  const stats = [
    { value: 500, suffix: "+", label: t.hero.stats.hectares },
    { value: 1200, suffix: "+", label: t.hero.stats.farmers },
    { value: 15, suffix: "+", label: t.hero.stats.years },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 -z-10" />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-ebo-green/8 dark:bg-ebo-lime/10 text-ebo-green dark:text-ebo-lime px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
        >
          <Leaf className="w-4 h-4" />
          {t.hero.badge}
        </motion.div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-ebo-black dark:text-white leading-[1.1] mb-6">
          {[
            t.hero.title1,
            t.hero.title2,
          ].map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="block text-ebo-green dark:text-ebo-lime"
          >
            {t.hero.titleAccent}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#produits" onClick={(e) => handleScroll(e, "#produits")}>
            <Button>
              <ArrowRight className="w-4 h-4" />
              {t.hero.ctaProducts}
            </Button>
          </a>
          <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
            <Button variant="outline">
              <Mail className="w-4 h-4" />
              {t.hero.ctaContact}
            </Button>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-16"
      >
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-ebo-green dark:text-ebo-lime leading-none">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-widest mt-2">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
