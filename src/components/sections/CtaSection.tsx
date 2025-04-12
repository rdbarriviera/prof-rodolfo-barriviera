"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Cta from "@/app/messages/sections/CtaSection.json";
import { useLanguage } from "@/context/LanguageContext";
import type { CtaJson } from "@/types/sections/CtaSection";

export function CTASection() {
  const { language } = useLanguage();
  const content = (Cta as CtaJson)[language];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-white/10 rounded-full -mr-16 sm:-mr-32 -mt-16 sm:-mt-32" />
          <div className="absolute bottom-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-white/10 rounded-full -ml-16 sm:-ml-32 -mb-16 sm:-mb-32" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:gap-8">
            <div className="w-full text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                {content.cta.title}
              </h2>
            </div>

            <motion.div className="w-full flex flex-col md:flex-row justify-center mt-6 md:mt-0 gap-12">
              <Link
                href="https://www.instagram.com/prof.rodolfobarriviera/"
                target="_blank"
              >
                <Button className="bg-white text-blue-600 hover:bg-green-50 shadow-lg px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg w-full md:w-auto">
                  <Instagram className="mr-2 h-24 w-24" />
                  Instagram
                </Button>
              </Link>

              <Link
                href="https://br.linkedin.com/in/profrodolfobarriviera"
                target="_blank"
              >
                <Button className="bg-white text-blue-600 hover:bg-green-50 shadow-lg px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg w-full md:w-auto">
                  <Linkedin className="mr-2 h-24 w-24" />
                  Linkedin
                </Button>
              </Link>
              <Link
                href="https://www.facebook.com/profrodolfobarriviera/?locale=pt_BR"
                target="_blank"
              >
                <Button className="bg-white text-blue-600 hover:bg-green-50 shadow-lg px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg w-full md:w-auto">
                  <Facebook className="mr-2 h-24 w-24" />
                  Facebook
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
