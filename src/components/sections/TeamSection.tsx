"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Linkedin } from "lucide-react";

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const teamMembers = [
    {
      name: "LETÍCIA ITO",
      role: "Análise e Desenvolvimento de Sistemas - 3° período",
      image: "/team/leticia.png?height=200&width=200",
      href: "https://www.linkedin.com/in/leticia-ito-3046591a2/",
    },
    {
      name: "GABRIEL FERNANDES",
      role: "Análise e Desenvolvimento de Sistemas - 5° período",
      image: "/team/gabriel.png?height=200&width=200",
      href: "https://www.linkedin.com/in/gabriel-fernandes-920421204/",
    },

    {
      name: "MÁRCIA CRISTINA",
      role: "Prof. do Instituto Federal do Paraná",
      image: "/team/marcia.png?height=200&width=200",
      href: "http://www.linkedin.com/in/marcia-cristina-dos-reis-5a78b4230",
    },

    {
      name: "ADRIAN CAMPANA",
      role: "Análise e Desenvolvimento de Sistemas - 5° período",
      image: "/team/adrian.png?height=200&width=200",
      href: "https://www.linkedin.com/in/adrian-campana/",
    },
    {
      name: "MARCELO RIBEIRO",
      role: "Análise e Desenvolvimento de Sistemas - 5° período",
      image: "/team/marcelo.png?height=200&width=200",
      href: "https://www.linkedin.com/in/marceloribeiromartins/",
    },
    {
      name: "JÚLIO DE MELLO",
      role: "Apoio Administrativo",
      image: "/team/julio.png?height=200&width=200",
      href: "",
    },
  ];

  return (
    <section
      id="equipe"
      className="w-full py-12 md:py-24 lg:py-32 bg-background"
    >
      <div className="container px-4 md:px-6 max-w-[1200px] mx-auto">
        <motion.div
          ref={ref}
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              EQUIPE
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Conheça os profissionais que trabalham juntos para oferecer a
              melhor experiência de aprendizado.
            </p>
          </div>
        </motion.div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src={member.image || "/placeholder.svg"}
                  width={160}
                  height={160}
                  alt={member.name}
                  className="aspect-square h-full w-full object-cover"
                />
              </div>
              <div className="space-y-1 text-center">
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  href={member.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
