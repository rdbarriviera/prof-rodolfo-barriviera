"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import hero from "@/app/messages/sections/HeroSection.json";
import { useLanguage } from "@/context/LanguageContext";
import type { HeroJson } from "@/types/sections/HeroSection";
import FloatingQualifications from "../bubbles/floating-qualifications";

export default function HeroSectionTest() {
  const { language } = useLanguage();
  const content = (hero as HeroJson)[language];
  return (
    <section className="mt-20 md:mt-0 relative overflow-hidden py-20 md:py-32 flex items-center">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
        <div className="absolute inset-0" />
      </div>

      <div className="container max-w-[1200px] relative px-4 lg:px-0 z-10 mx-auto items-center">
        <motion.div
          className="flex items-center justify-center lg:hidden mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="w-full min-w-lg mx-auto drop-shadow-2xl">
            <Image
              src="/Prof.png"
              width={500}
              height={500}
              alt="Prof. Rodolfo Barriviera"
              className="high-contrast-border w-64 h-64 md:w-96 md:h-96 object-cover mx-auto rounded-full "
            />
          </div>
        </motion.div>
        <motion.div
          className="max-w-[1200px] mx-auto grid md:grid-cols-[60%_auto] gap-6 xl:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col justify-center space-y-4">
            <FloatingQualifications />
          </div>
          <motion.div
            className="items-center justify-end hidden lg:flex"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="w-full min-w-lg flex justify-center drop-shadow-2xl">
              <Image
                src="/Prof.png"
                width={500}
                height={500}
                alt="Prof. Rodolfo Barriviera"
                className="high-contrast-border w-64 h-64 md:w-96 md:h-96 object-cover flex justify-center rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
