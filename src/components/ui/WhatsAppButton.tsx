"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/components/ui/LocaleProvider";
import { getTranslations } from "@/lib/i18n";
import { siteConfig } from "@/data/site";
import { waLink } from "@/lib/utils";

export function WhatsAppButton() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  return (
    <motion.a
      href={waLink(siteConfig.whatsapp, t.whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg shadow-[#25D366]/30 hover:bg-[#128C7E] transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-semibold hidden sm:inline">{t.whatsapp.button}</span>
    </motion.a>
  );
}
