"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import menuContent from "@/app/messages/layout/menuMobile.json";
import { MenuTranslations } from "@/types/layout/MenuMobile";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../ThemeToggle";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const content = menuContent[language as keyof MenuTranslations];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const normalizeText = (text: string) => {
    return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  };

  const handleNavigation = (id: string) => {
    setIsOpen(false);
    const normalizedId = normalizeText(id);
    const section = document.getElementById(normalizedId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${normalizedId}`;
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    }),
  };

  return (
    <div className="relative">
      <header className="high-contrast-border fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-lg shadow-lg py-4 max-w-[1200px] rounded-3xl mt-4 mx-4 flex justify-between items-center px-6">
        <div className="text-xl font-bold">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[var(--primary-color)] text-sm">
              Prof. Rodolfo Barriviera
            </span>
          </Link>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <ThemeToggle />
          <button onClick={toggleMenu} className="z-50">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="h-8 w-8 text-[var(--primary-color)]" />
              ) : (
                <Menu className="h-8 w-8 text-[var(--primary-color)]" />
              )}
            </motion.div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed inset-x-0 z-40 flex flex-col items-center justify-start h-full bg-[var(--background)]/80 backdrop-blur-lg shadow-lg py-16 px-8 mx-4 mt-20 rounded-3xl rounded-b-xl"
          >
            <motion.ul className="space-y-8 text-center">
              {content.items.map((item, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  className="text-xl text-[var(--primary-color)] hover-primary cursor-pointer transition duration-300"
                  onClick={() => handleNavigation(item.label)}
                >
                  {item.label}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              className="mt-8 flex flex-col gap-4"
            >
              <Link
                href="http://lattes.cnpq.br/6966615403860909"
                target="_blank"
                onClick={() => setIsOpen(false)}
              >
                <button className="flex flex-row gap-2  items-center bg-[var(--primary-color)] text-[var(--button-foreground)] px-6 py-3 rounded-xl hover:bg-blue-500 transition duration-300">
                  {content.cv}
                  <Download size={16} />
                </button>
              </Link>
              <Button
                onClick={toggleLanguage}
                variant="outline"
                className="h-12 rounded-xl"
              >
                {language === "pt" ? "🇧🇷 PT" : "🇺🇸 EN"}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
