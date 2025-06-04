"use client";

import { motion } from "framer-motion";
import {
  Shield,
  ImageIcon,
  Computer,
  Network,
  BookOpen,
  Lightbulb,
  Monitor,
  TrendingUp,
  Award,
} from "lucide-react";

const qualifications = [
  {
    title: "Professor/Pesquisador da área de Inteligência Artificial",
    icon: Computer,
    color: "bg-blue-500",
  },
  {
    title: "Doutor em Segurança Cibernética",
    icon: Shield,
    color: "bg-red-500",
  },
  {
    title: "Mestre em Processamento de Imagens",
    icon: ImageIcon,
    color: "bg-purple-500",
  },
  {
    title: "Engenheiro da Computação",
    icon: Computer,
    color: "bg-green-500",
  },
  {
    title: "Especialista em Redes de Computadores",
    icon: Network,
    color: "bg-orange-500",
  },
  {
    title: "Especialista em Metodologia do Ensino Superior",
    icon: BookOpen,
    color: "bg-indigo-500",
  },
  {
    title: "Especialista em Gestão de Ambientes de Inovação",
    icon: Lightbulb,
    color: "bg-yellow-500",
  },
  {
    title: "Especializado em Ensino à Distância",
    icon: Monitor,
    color: "bg-teal-500",
  },
  {
    title: "Especializado em Marketing Digital",
    icon: TrendingUp,
    color: "bg-pink-500",
  },
  {
    title: "Avaliador/Auditor Nacional e Internacional pelo MEC",
    icon: Award,
    color: "bg-cyan-500",
  },
];

export default function Component() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Qualificações Profissionais
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experiência e expertise em diversas áreas da tecnologia e educação
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qualifications.map((qualification, index) => {
            const IconComponent = qualification.icon;
            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.3,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col items-center text-center relative overflow-hidden">
                  {/* Background bubble effect */}
                  <motion.div
                    className={`absolute inset-0 ${qualification.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    initial={false}
                  />

                  {/* Icon bubble */}
                  <motion.div
                    className={`${qualification.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg`}
                    whileHover={{
                      rotate: 360,
                      transition: { duration: 0.6 },
                    }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                    {qualification.title}
                  </h3>

                  {/* Animated border */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 ${qualification.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15 + 0.3,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating bubbles decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-blue-200 rounded-full opacity-20"
              animate={{
                y: [-20, -100],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.2, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
