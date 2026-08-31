"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, Loader2,
  MessageCircle
} from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/components/ui/LocaleProvider";
import { getTranslations } from "@/lib/i18n";
import { siteConfig } from "@/data/site";
import { waLink, telLink, mailLink } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Phone, Mail, MapPin, Clock,
};

const infoIds = ["phone", "email", "address", "hours"] as const;
const iconNames = ["Phone", "Mail", "MapPin", "Clock"] as const;

export function Contact() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  const [formState, setFormState] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ nom: "", email: "", sujet: "", message: "" });
    setTimeout(() => setIsSuccess(false), 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 relative">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-ebo-green dark:text-ebo-lime border border-ebo-green dark:border-ebo-lime rounded-full px-4 py-1.5 mb-4">
            {t.contact.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ebo-black dark:text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            {t.contact.desc}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <StaggerContainer className="lg:col-span-2 space-y-4" staggerDelay={0.1}>
            {infoIds.map((id, i) => {
              const info = t.contact.infos[id];
              const Icon = iconMap[iconNames[i]];
              const href = id === "phone" ? telLink(siteConfig.phone) :
                id === "email" ? mailLink(siteConfig.email) : undefined;

              const Wrapper = href ? motion.a : motion.div;
              const wrapperProps = href
                ? { href, className: "flex items-start gap-4 p-5 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group cursor-pointer" }
                : { className: "flex items-start gap-4 p-5 bg-gray-50 dark:bg-gray-900 rounded-xl transition-colors duration-200" };

              return (
                <StaggerItem key={id}>
                  <Wrapper {...wrapperProps} whileHover={href ? { x: 4 } : undefined}>
                    <div className="w-12 h-12 bg-ebo-green dark:bg-ebo-lime rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white dark:text-gray-900" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                        {info.label}
                      </h4>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-pre-line group-hover:text-ebo-green dark:group-hover:text-ebo-lime transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </Wrapper>
                </StaggerItem>
              );
            })}

            {/* WhatsApp CTA */}
            <StaggerItem>
              <a
                href={waLink(siteConfig.whatsapp, t.whatsapp.message)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-5 bg-[#25D366]/10 dark:bg-[#25D366]/5 rounded-xl hover:bg-[#25D366]/15 dark:hover:bg-[#25D366]/10 transition-colors cursor-pointer border border-[#25D366]/20 dark:border-[#25D366]/10"
                >
                  <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#25D366] uppercase tracking-wider mb-1">
                      {t.contact.whatsapp.label}
                    </h4>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {t.contact.whatsapp.value}
                    </p>
                  </div>
                </motion.div>
              </a>
            </StaggerItem>
          </StaggerContainer>

          <Reveal className="lg:col-span-3" delay={0.2}>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 relative overflow-hidden">
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 z-10 bg-ebo-green dark:bg-ebo-lime flex flex-col items-center justify-center text-white dark:text-gray-900"
                  >
                    <CheckCircle2 className="w-12 h-12 mb-3" />
                    <p className="text-lg font-semibold">{t.contact.form.success}</p>
                    <p className="text-sm opacity-80 dark:opacity-70">{t.contact.form.successSub}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formState.nom}
                      onChange={handleChange}
                      placeholder={t.contact.form.namePlaceholder}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-ebo-green dark:focus:border-ebo-lime focus:ring-3 focus:ring-ebo-green/10 dark:focus:ring-ebo-lime/10 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder={t.contact.form.emailPlaceholder}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-ebo-green dark:focus:border-ebo-lime focus:ring-3 focus:ring-ebo-green/10 dark:focus:ring-ebo-lime/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.contact.form.subject}
                  </label>
                  <select
                    name="sujet"
                    value={formState.sujet}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-ebo-green dark:focus:border-ebo-lime focus:ring-3 focus:ring-ebo-green/10 dark:focus:ring-ebo-lime/10 transition-all appearance-none"
                  >
                    <option value="" disabled>{t.contact.form.subjectPlaceholder}</option>
                    <option value="produits">{t.contact.form.subjects.products}</option>
                    <option value="services">{t.contact.form.subjects.services}</option>
                    <option value="devis">{t.contact.form.subjects.quote}</option>
                    <option value="partenariat">{t.contact.form.subjects.partnership}</option>
                    <option value="autre">{t.contact.form.subjects.other}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder={t.contact.form.messagePlaceholder}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:border-ebo-green dark:focus:border-ebo-lime focus:ring-3 focus:ring-ebo-green/10 dark:focus:ring-ebo-lime/10 transition-all resize-y min-h-[120px]"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.contact.form.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t.contact.form.submit}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
