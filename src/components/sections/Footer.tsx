"use client";

import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLocale } from "@/components/ui/LocaleProvider";
import { getTranslations } from "@/lib/i18n";
import { siteConfig } from "@/data/site";
import { telLink, mailLink } from "@/lib/utils";

export function Footer() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

  const footerLinks = [
    { href: "#accueil", label: t.nav.accueil },
    { href: "#produits", label: t.nav.produits },
    { href: "#services", label: t.nav.services },
    { href: "#tarifs", label: t.nav.tarifs },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-ebo-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/images/logo.png"
              alt="Ebotan"
              width={140}
              height={42}
              className="h-9 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-4">
              {t.footer.brand}
            </p>
            <p className="text-xs text-ebo-lime/70 font-medium">
              {t.footer.subsidiary}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-5">{t.footer.nav}</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-ebo-lime transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-5">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={telLink(siteConfig.phone)}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-ebo-lime transition-colors"
                >
                  <Phone className="w-4 h-4 text-ebo-lime" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={mailLink(siteConfig.email)}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-ebo-lime transition-colors"
                >
                  <Mail className="w-4 h-4 text-ebo-lime" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-ebo-lime" />
                {siteConfig.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-8 text-center">
          <p className="text-xs text-gray-500">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
