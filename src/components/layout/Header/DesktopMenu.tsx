"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download } from "lucide-react";

const DesktopMenu = () => {
  const menuItems = [
    { label: "Sobre", href: "/#sobre" },
    { label: "Projetos", href: "/#projetos" },
    { label: "Cursos", href: "/#cursos" },
    { label: "Equipe", href: "/#equipe" },
    { label: "Contato", href: "mailto:rodolfo.barriviera@ifpr.edu.br" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-lg py-2 max-w-[1200px] rounded-3xl mx-auto mt-4">
      <div className="container mx-auto flex justify-between items-center px-8 gap-4">
        <motion.div
          className="text-black text-3xl font-bold cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold text-black">
              Prof. Rodolfo Barriviera
            </span>
          </Link>
        </motion.div>

        {/* Menu Links */}
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.1, duration: 0.5 },
              }}
            >
              <a
                href={item.href}
                className="text-black text-lg hover:text-blue-700 transition text-nowrap"
              >
                {item.label}
              </a>

              {/* Barra deslizante abaixo do texto ao passar o mouse */}
              <motion.div
                className="absolute left-0 bottom-0 h-0.5 bg-blue-300 w-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                layoutId="underline"
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
              />
            </motion.div>
          ))}
        </nav>
        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
        >
          <a
            href="http://lattes.cnpq.br/6966615403860909"
            target="_blank"
            className="pl-4"
          >
            <button className=" flex flex-row gap-2 items-center bg-blue-400 text-white font-bold px-6 py-2 rounded-xl cursor-pointer hover:bg-black transition duration-300">
              Currículo
              <Download size={16} />
            </button>
          </a>
        </motion.div>
      </div>
    </header>
  );
};

export default DesktopMenu;
