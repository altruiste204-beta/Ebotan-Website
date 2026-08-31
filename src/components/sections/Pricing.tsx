"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/components/ui/LocaleProvider";
import { getTranslations } from "@/lib/i18n";

const planIds = ["essentiel", "professionnel", "entreprise"] as const;

const featureKeys = [
  ["Livraison standard", "Conseil téléphonique", "Catalogue produits", "Support par email", "Visite sur site", "Formation incluse"],
  ["Livraison prioritaire", "Conseil agronomique dédié", "Catalogue complet", "Support prioritaire", "2 visites sur site / mois", "Formation incluse"],
  ["Livraison express 24h", "Expert agronome dédié", "Catalogue premium", "Support 24/7", "Visites illimitées", "Formations incluses"],
];

const featureIncluded = [
  [true, true, true, true, false, false],
  [true, true, true, true, true, false],
  [true, true, true, true, true, true],
];

export function Pricing() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  return (
    <section id="tarifs" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 relative">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-ebo-green dark:text-ebo-lime border border-ebo-green dark:border-ebo-lime rounded-full px-4 py-1.5 mb-4">
            {t.pricing.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ebo-black dark:text-white mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            {t.pricing.desc}
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start" staggerDelay={0.15}>
          {planIds.map((planId, planIndex) => {
            const plan = t.pricing.plans[planId];
            const isFeatured = planId === "professionnel";
            const price = planId === "essentiel" ? 50000 : planId === "professionnel" ? 150000 : 350000;

            return (
              <StaggerItem key={planId}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative bg-white dark:bg-gray-900 border rounded-2xl p-8 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 ${
                    isFeatured
                      ? "border-2 border-ebo-green dark:border-ebo-lime shadow-lg shadow-ebo-green/10 dark:shadow-ebo-lime/10 md:scale-[1.03]"
                      : "border-gray-100 dark:border-gray-800"
                  }`}
                >
                  {(plan as { badge?: string }).badge && (
                    <div className="absolute -top-px right-8 bg-ebo-green dark:bg-ebo-lime text-white dark:text-gray-900 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-b-lg">
                      {(plan as { badge?: string }).badge}
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-ebo-black dark:text-white">{plan.name}</h3>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{plan.desc}</p>
                  </div>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-sm font-semibold text-gray-400 dark:text-gray-500">FCFA</span>
                    <span className="text-4xl font-extrabold text-ebo-green dark:text-ebo-lime">
                      {new Intl.NumberFormat("fr-FR").format(price)}
                    </span>
                    <span className="text-sm text-gray-400 dark:text-gray-500">{t.pricing.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {featureKeys[planIndex].map((key, i) => {
                      const included = featureIncluded[planIndex][i];
                      return (
                        <li key={i} className={`flex items-center gap-3 text-sm ${included ? "text-gray-700 dark:text-gray-300" : "text-gray-300 dark:text-gray-600"}`}>
                          {included ? (
                            <CheckCircle2 className="w-5 h-5 text-ebo-green dark:text-ebo-lime flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-200 dark:text-gray-700 flex-shrink-0" />
                          )}
                          {t.pricing.features[key as keyof typeof t.pricing.features] || key}
                        </li>
                      );
                    })}
                  </ul>

                  <a href="#contact">
                    <Button variant={isFeatured ? "default" : "outline"} className="w-full">
                      {t.pricing.choose}
                    </Button>
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
