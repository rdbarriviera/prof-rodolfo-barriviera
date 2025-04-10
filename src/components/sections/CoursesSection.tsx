"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";
import Link from "next/link";

interface Course {
  title: string;
  description: string;
  status: string;
  image: string;
  href: string;
}

export default function CoursesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const courses = [
    {
      title: "Sistemas Operacionais",
      description:
        "Na disciplina de Sistemas Operacionais, os alunos aprendem os fundamentos e as principais funções dos sistemas operacionais, que são essenciais para o funcionamento dos computadores. O curso aborda o gerenciamento de processos, incluindo a criação, execução e sincronização de processos, bem como a comunicação entre eles.",
      status: "Disponível",
      image: "/courses/sistema.png?height=200&width=400",
      href: "https://mega.nz/file/qZ4FgaIJ#do3aao6O1la3W6ahoIKnsZQC_QAtvWwBGvZjEwGUtg4",
    },
    {
      title: "Arquitetura e Organização de Computadores",
      description:
        "Na disciplina de Arquitetura e Organização de Computadores, os alunos analisam a estrutura interna dos computadores, unidades de processamento, memória, barramentos e explorar os princípios de funcionamento e desempenho de sistemas computacionais.",
      status: "Disponível",
      image: "/courses/arquitetura.png?height=200&width=400",
      href: "https://mega.nz/file/LYpmgRCB#YIi71TFla-0hahrAJ2M3hDsvhGMRBgbiNcxZhgEFBw8",
    },
    {
      title: "Redes de Computadores",
      description:
        "Na disciplina de Redes de Computadores, os alunos aprendem os princípios fundamentais que regem a comunicação entre dispositivos em uma rede. O curso abrange a arquitetura de redes, incluindo modelos de referência como o OSI e o TCP/IP, que facilitam a compreensão das diferentes camadas de comunicação.",
      status: "Disponível",
      image: "/courses/redes.png?height=200&width=400",
      href: "https://mega.nz/file/jBxkRCwC#WY-soEYLpbcOEe_b5iHTgHOB4ykA27oWQBz8c-mFp6w",
    },
    {
      title: "Auditoria e Segurança de Sistemas",
      description:
        "Na disciplina de Auditoria e Segurança de Sistemas, os alunos aprendem a identificar vulnerabilidades, implementar controles de segurança e realizar auditorias em sistemas de informação, visando proteger dados e garantir a integridade das operações.",
      status: "Disponível",
      image: "/courses/auditoria.png?height=200&width=400",
      href: "https://mega.nz/file/7UoBxJTQ#6nO1PaPBep5nBJW5ZD1zS-8TCk2lW23h9wyEH-5CGT8",
    },
    {
      title: "Inteligência Artificial",
      description:
        "No curso de Inteligência Artificial, os alunos estudam os princípios e técnicas, como raciocínio lógico, aprendizado de máquina, que permitem a simulação de processos cognitivos por máquinas, abrangendo tópicos como Eng. de Prompt, Agentes, Clone de Cérebro e IA Aplicada.",
      status: "EM BREVE",
      image: "/courses/ia.png?height=200&width=400",
      href: "",
    },
    {
      title: "Criptomoedas",
      description:
        "No curso de Criptomoedas, os alunos aprendem os princípios e fundamentos das moedas digitais, com ênfase nas tecnologias que possibilitam sua operação, como blockchain, questões de segurança, Bitcoin, Ethereum, Carteiras e Análise de Projetos de Criptomoedas.",
      status: "EM BREVE",
      image: "/courses/criptomoedas.png?height=200&width=400",
      href: "",
    },
  ];

  // Carousel state
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay || isDesktop) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, courses.length, isDesktop]);

  const next = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
  };

  return (
    <section
      id="cursos"
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
              Estude com o professor
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Vamos caminhar juntos na busca pelo conhecimento, construindo uma
              trajetória de aprendizado que nos levará a novas descobertas e
              realizações.
            </p>
          </div>
        </motion.div>

        {isDesktop ? (
          // Desktop Grid View
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        ) : (
          // Mobile Carousel View
          <div className="relative max-w-md mx-auto py-12">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                >
                  <CourseCard course={courses[current]} />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-background hover:bg-muted text-foreground rounded-full p-2 z-10 shadow-md"
              onClick={prev}
              aria-label="Curso anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-background hover:bg-muted text-foreground rounded-full p-2 z-10 shadow-md"
              onClick={next}
              aria-label="Próximo curso"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="flex justify-center mt-6 space-x-2">
              {courses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setCurrent(index);
                  }}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    current === index ? "bg-primary w-6" : "bg-muted-foreground"
                  }`}
                  aria-label={`Ir para curso ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white flex items-center gap-2">
            {course.status === "EM BREVE" && (
              <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                EM BREVE
              </span>
            )}
          </div>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-5 text-sm">
          {course.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Link href={course.href} target="_blank">
          <Button variant="outline" size="sm" className="w-full group">
            <BookOpen className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            {course.status === "EM BREVE" ? "" : "Quero o material"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
