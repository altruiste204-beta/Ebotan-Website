"use client";

import { motion } from "framer-motion";
import {
  Leaf, FlaskConical, ShieldCheck, Wheat, Droplets, Tractor,
  ArrowRight
} from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { useLocale } from "@/components/ui/LocaleProvider";
import { getTranslations } from "@/lib/i18n";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Leaf, FlaskConical, ShieldCheck, Wheat, Droplets, Tractor,
};

const productIds = [
  "engrais-organiques",
  "fertilisants-mineraux",
  "phytosanitaires-bio",
  "semences-certifiees",
  "irrigation",
  "materiel-agricole",
] as const;

export function Products() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  return (
    <section id="produits" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 relative">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-ebo-green dark:text-ebo-lime border border-ebo-green dark:border-ebo-lime rounded-full px-4 py-1.5 mb-4">
            {t.products.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ebo-black dark:text-white mb-4">
            {t.products.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            {t.products.desc}
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {productIds.map((id) => {
            const product = t.products.items[id];
            const Icon = iconMap[id === "engrais-organiques" ? "Leaf" :
              id === "fertilisants-mineraux" ? "FlaskConical" :
              id === "phytosanitaires-bio" ? "ShieldCheck" :
              id === "semences-certifiees" ? "Wheat" :
              id === "irrigation" ? "Droplets" : "Tractor"];
            return (
              <StaggerItem key={id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 transition-shadow duration-300"
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[3px] bg-ebo-green dark:bg-ebo-lime rounded-t-2xl origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />

                  <div className="w-14 h-14 bg-ebo-green/8 dark:bg-ebo-lime/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-ebo-green dark:group-hover:bg-ebo-lime transition-colors duration-300">
                    <Icon className="w-7 h-7 text-ebo-green dark:text-ebo-lime group-hover:text-white dark:group-hover:text-gray-900 transition-colors duration-300" />
                  </div>

                  <h3 className="text-lg font-bold text-ebo-black dark:text-white mb-2">{product.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">{product.desc}</p>

                  <a href="#contact" className="inline-flex items-center gap-1 text-sm font-semibold text-ebo-green dark:text-ebo-lime hover:gap-2 transition-all duration-200">
                    {t.products.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
