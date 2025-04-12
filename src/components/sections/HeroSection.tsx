"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import hero from "@/app/messages/sections/HeroSection.json";
import { useLanguage } from "@/context/LanguageContext";
import type { HeroJson } from "@/types/sections/HeroSection";

export default function HeroSection() {
  const { language } = useLanguage();
  const content = (hero as HeroJson)[language];
  return (
    <section className="relative overflow-hidden py-20 md:py-32 min-h-screen flex items-center">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-50" />
      </div>

      <div className="container max-w-[1200px] relative px-4 lg:px-0 z-10 mx-auto">
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
              className="w-64 h-64 md:w-96 md:h-96 object-cover mx-auto rounded-full "
            />
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col gap-6 lg:flex-row lg:gap-12 xl:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1
                className="text-center lg:text-start text-xl font-bold tracking-tighter sm:text-2xl xl:text-4xl/none drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {content.title}
              </motion.h1>
              <motion.p
                className="text-center lg:text-start lg:max-w-[600px] text-muted-foreground md:text-xl drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {content.description}
              </motion.p>
            </div>
            <motion.div
              className="text-center lg:text-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link href="/#sobre">
                <Button size="lg" className="group">
                  {content.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="items-center justify-center hidden lg:flex"
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
                className="w-64 h-64 md:w-96 md:h-96 object-cover flex justify-center rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
