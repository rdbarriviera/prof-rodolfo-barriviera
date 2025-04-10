"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              O seu professor
            </h2>
            <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sou o Prof. Dr. Rodolfo Barriviera, pai, autodidata, um sonhador e
              realizador de sonhos, dedicado à trajetória acadêmica e
              profissional centrada no aprendizado e ensino.
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
            <div className="space-y-4">
              <p className="text-muted-foreground text-center lg:text-start">
                Iniciei minha jornada graduando-me em Engenharia da Computação,
                com pesquisa focada em Agentes Inteligentes. Avancei obtendo o
                título de Mestre em Processamento de Imagens e concluí meu
                Doutorado em Segurança Computacional.
              </p>
              <p className="text-muted-foreground text-center lg:text-start">
                Desde 2010, atuo como Professor Federal, compartilhando
                conhecimento e inspirando novas gerações de estudantes. Também
                exerço o papel de Gestor de Projetos de Tecnologia e Inovação,
                liderando iniciativas cruciais para o progresso da área.
              </p>
              <p className="text-muted-foreground text-center lg:text-start">
                Tenho a satisfação de participar de projetos de impacto em
                colaboração com parceiros como Huawei, onde contribuo com
                capacitações em Cloud Services e 5G, e com a Agência Espacial
                Brasileira (AEB) no projeto Desenvolvimento de Negócios com
                Produtos e Serviços Espaciais.
              </p>
              <p className="font-medium text-center lg:text-start">
                Minha missão é ajudar as pessoas a prosperarem por meio do
                aprendizado da tecnologia!
              </p>
              <p className="text-muted-foreground text-center lg:text-start">
                Atuo nas áreas de: Segurança Computacional, Inteligência
                Artificial e Gestão de Projetos.
              </p>
            </div>
            <div className="flex gap-4 justify-center lg:justify-start">
              <Link href="/#projetos">
                <Button variant="outline">Projetos</Button>
              </Link>
              <Link href="mailto:rodolfo.barriviera@ifpr.edu.br">
                <Button variant="outline">Contato</Button>
              </Link>
              <Link
                href="http://lattes.cnpq.br/6966615403860909"
                target="_blank"
              >
                <Button variant="outline">Currículo</Button>
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
