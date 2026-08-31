"use client";

import { motion } from "framer-motion";
import { Map, GraduationCap, Truck, TrendingUp } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { useLocale } from "@/components/ui/LocaleProvider";
import { getTranslations } from "@/lib/i18n";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Map, GraduationCap, Truck, TrendingUp,
};

const serviceIds = [
  "conseil-agronomique",
  "formation",
  "logistique",
  "suivi",
] as const;

export function Services() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-ebo-black text-white relative">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-ebo-lime border border-ebo-lime rounded-full px-4 py-1.5 mb-4">
            {t.services.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.services.title}
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {t.services.desc}
          </p>
        </Reveal>

        <StaggerContainer className="space-y-0" staggerDelay={0.15}>
          {serviceIds.map((id, index) => {
            const service = t.services.items[id];
            const Icon = iconMap[id === "conseil-agronomique" ? "Map" :
              id === "formation" ? "GraduationCap" :
              id === "logistique" ? "Truck" : "TrendingUp"];
            return (
              <StaggerItem key={id}>
                <motion.div
                  whileHover={{ x: 16 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex gap-6 sm:gap-8 py-8 border-b border-white/[0.08] last:border-b-0 cursor-default"
                >
                  <div className="text-4xl sm:text-5xl font-extrabold text-ebo-lime/15 group-hover:text-ebo-lime transition-colors duration-500 min-w-[80px]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-3">
                      <Icon className="w-5 h-5 text-ebo-lime" />
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-lg">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
