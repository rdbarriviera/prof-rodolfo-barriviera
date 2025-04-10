"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Função para remover acentos
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const handleNavigation = (id: string) => {
    if (id === "Sobre") {
      setIsOpen(false); // Fecha o menu imediatamente
      window.location.href = "/#sobre";
      return;
    }
    if (id === "/") {
      setIsOpen(false); // Fecha o menu imediatamente
      window.location.href = "/";
      return;
    }
    if (id === "Projetos") {
      setIsOpen(false); // Fecha o menu imediatamente
      window.location.href = "/#projetos";
      return;
    }
    if (id === "Cursos") {
      setIsOpen(false); // Fecha o menu imediatamente
      window.location.href = "/#cursos";
      return;
    }
    if (id === "Equipe") {
      setIsOpen(false); // Fecha o menu imediatamente
      window.location.href = "/#equipe";
      return;
    }
    if (id === "Contato") {
      setIsOpen(false); // Fecha o menu imediatamente
      window.location.href = "/#contato";
      return;
    }

    const normalizedId = normalizeText(id);
    const section = document.getElementById(normalizedId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsOpen(false);
            observer.disconnect();
          }
        },
        { threshold: 0.7 }
      );

      observer.observe(section);
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-lg py-4 max-w-[1200px] rounded-3xl mt-4 mx-4 flex justify-between items-center px-6">
        <div className="text-xl font-bold">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-blue-900 text-sm">
              Prof. Rodolfo Barriviera
            </span>
          </Link>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <button onClick={toggleMenu} className="z-50">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="h-8 w-8 text-blue-900" />
              ) : (
                <Menu className="h-8 w-8 text-blue-900" />
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
            className="fixed inset-x-0 z-40 flex flex-col items-center justify-start h-full bg-white/90 backdrop-blur-lg shadow-lg py-16 px-8 mx-4 mt-20 rounded-3xl rounded-b-xl"
          >
            <motion.ul className="space-y-8 text-center">
              {["Sobre", "Projetos", "Cursos", "Equipe"].map((item, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  className="text-xl text-blue-900 hover:text-blue-800 cursor-pointer transition duration-300"
                  onClick={() => handleNavigation(item)}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              className="mt-8"
            >
              <Link
                href="http://lattes.cnpq.br/6966615403860909"
                target="_blank"
                onClick={() => setIsOpen(false)}
              >
                <button className="flex flex-row gap-2  items-center bg-blue-400 text-white px-6 py-3 rounded-xl hover:bg-blue-500 transition duration-300">
                  Currículo
                  <Download size={16} />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
