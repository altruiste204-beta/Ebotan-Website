"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Globe, Users, Recycle, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { useLocale } from "@/components/ui/LocaleProvider";
import { getTranslations } from "@/lib/i18n";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BadgeCheck, Globe, Users, Recycle,
};

const cardIds = ["quality", "local", "human", "sustainable"] as const;
const iconNames = ["BadgeCheck", "Globe", "Users", "Recycle"] as const;

export function About() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % t.about.testimonials.length);
  }, [t.about.testimonials.length]);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <section id="autres" className="py-24 px-4 sm:px-6 lg:px-8 bg-ebo-black text-white relative">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-ebo-lime border border-ebo-lime rounded-full px-4 py-1.5 mb-4">
            {t.about.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.about.title}
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {t.about.desc}
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20" staggerDelay={0.12}>
          {cardIds.map((id, i) => {
            const card = t.about.cards[id];
            const Icon = iconMap[iconNames[i]];
            return (
              <StaggerItem key={id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors duration-300"
                >
                  <div className="w-[60px] h-[60px] bg-ebo-lime/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-ebo-lime transition-colors duration-300">
                    <Icon className="w-7 h-7 text-ebo-lime group-hover:text-ebo-black transition-colors duration-300" />
                  </div>
                  <h3 className="text-base font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Testimonials */}
        <Reveal className="text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-300 mb-8">
            {t.about.testimonialsTitle}
          </h3>

          <div className="relative min-h-[200px]">
            {t.about.testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: i === activeTestimonial ? 1 : 0,
                  x: i === activeTestimonial ? 0 : 30,
                  position: i === activeTestimonial ? "relative" : "absolute",
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="top-0 left-0 w-full"
              >
                <Quote className="w-12 h-12 text-ebo-lime/30 mx-auto mb-3" />
                <p className="text-base sm:text-lg italic text-gray-300 leading-relaxed mb-5">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <span className="block font-bold text-white">{testimonial.author}</span>
                  <span className="block text-xs text-gray-500">{testimonial.role}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2 justify-center mt-6">
            {t.about.testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === activeTestimonial
                    ? "w-8 bg-ebo-lime"
                    : "w-2.5 bg-gray-700 hover:bg-gray-500"
                }`}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
