"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import About from "@/app/messages/sections/AboutSection.json";
import { useLanguage } from "@/context/LanguageContext";
import type { AboutJson } from "@/types/sections/AboutSection";
import SectionHeader from "../layout/SectionHeader";
import { Copy } from "lucide-react";

export default function AboutSection() {
  const { language } = useLanguage();
  const content = (About as AboutJson)[language];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const email = "rodolfo.barriviera@ifpr.edu.br";
  const [copiado, setCopiado] = useState(false);

  const copiarEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000); // resetar estado depois de 2 segundos
    } catch (err) {
      console.error("Erro ao copiar o email: ", err);
    }
  };

  return (
    <section
      id="sobre"
      className="w-full py-12 md:py-24 lg:py-32 bg-background "
    >
      <div className="max-w-[1200px] mx-auto container px-4 md:px-6">
        <motion.div
          ref={ref}
          className="flex flex-col items-center space-y-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-2">
            <SectionHeader title={content.title} />
            <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {content.intro}
            </p>
          </div>
        </motion.div>
        <motion.div
          className="mx-auto overflow-hidden rounded-xl lg:hidden mt-8 max-w-xs w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Image
            src="/Prof.png"
            width={600}
            height={600}
            alt="Prof. Rodolfo Barriviera teaching"
            className="w-full max-w-xs rounded-xl object-cover object-center"
          />
        </motion.div>
        <div className="mx-auto flex items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12 justify-between">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-4 text-sm md:text-base break-words">
              <p className="text-muted-foreground text-center lg:text-start">
                {content.paragraphs[0]}
              </p>
              <p className="text-muted-foreground text-center lg:text-start">
                {content.paragraphs[1]}
              </p>
              <p className="text-muted-foreground text-center lg:text-start">
                {content.paragraphs[2]}
              </p>
              <p className="font-medium text-center lg:text-start">
                {content.paragraphs[3]}
              </p>
              <p className="text-muted-foreground text-center lg:text-start">
                {content.paragraphs[4]}
              </p>
              <div className="flex flex-row gap-2 items-center">
                {content.buttons.contact}
                <p className="break-all">{email}</p>
                <button className="cursor-pointer" onClick={copiarEmail}>
                  <Copy size={16} />
                </button>
                {copiado && (
                  <span className="text-sm text-green-500">Copiado!</span>
                )}
              </div>
            </div>
            <div className="flex gap-4 justify-center lg:justify-start">
              <Link href="/#projetos">
                <Button
                  variant="default"
                  className="high-contrast-border shadow-lg bg-[var(--second-background)]"
                >
                  {content.buttons.projects}
                </Button>
              </Link>

              <Link
                href="http://lattes.cnpq.br/6966615403860909"
                target="_blank"
              >
                <Button
                  variant="default"
                  className=" high-contrast-border shadow-lg bg-[var(--second-background)]"
                >
                  {content.buttons.curriculum}
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="max-w-md w-full ml-auto overflow-hidden rounded-xl hidden lg:flex"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Image
              src="/Prof.png"
              width={600}
              height={600}
              alt="Prof. Rodolfo Barriviera teaching"
              className="w-full max-w-sm overflow-hidden rounded-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
