"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
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
import Project from "@/app/messages/sections/ProjectsSection.json";
import { useLanguage } from "@/context/LanguageContext";
import type {
  ProjectsJson,
  ProjectItem,
} from "@/types/sections/ProjectsSection";
import SectionHeader from "../layout/SectionHeader";

interface Project {
  title: string;
  description: string;
  status: string;
  image: string;
  href: string;
}

export default function ProjectsSection() {
  const { language } = useLanguage();
  const content = (Project as ProjectsJson)[language];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const projects: ProjectItem[] = content.projects.items;

  // Carousel state
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay || isDesktop) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, projects.length, isDesktop]);

  const next = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <section
      id="projetos"
      className="w-full py-12 md:py-24 lg:py-32 bg-[var(--second-background)]"
    >
      <div className="container max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-2">
            <SectionHeader title={content.projects.title} />
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {content.projects.subtitle}
            </p>
          </div>
        </motion.div>

        {isDesktop ? (
          // Desktop Grid View
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <ProjectCard project={project} />
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
                  <ProjectCard project={projects[current]} />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-background hover:bg-muted text-foreground rounded-full p-2 z-10 shadow-md"
              onClick={prev}
              aria-label="Projeto anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-background hover:bg-muted text-foreground rounded-full p-2 z-10 shadow-md"
              onClick={next}
              aria-label="Próximo projeto"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="flex justify-center mt-6 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setCurrent(index);
                  }}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    current === index ? "bg-primary w-6" : "bg-muted-foreground"
                  }`}
                  aria-label={`Ir para projeto ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button size="lg">
              Ver todos os projetos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div> */}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { language } = useLanguage();
  const content = (Project as ProjectsJson)[language];
  return (
    <Card className="h-full overflow-hidden">
      <div className="relative">
        <Image
          src={project.image || "/placeholder.svg"}
          width={400}
          height={200}
          alt={project.title}
          className="w-full object-cover"
        />
        <div className="absolute top-2 right-2 rounded-full bg-[var(--primary-color)] px-3 py-1 text-xs font-medium text-[var(--button-foreground)]">
          {project.status == "FREE"
            ? content.projects.button.learnMore
            : project.status == "ENCERRADO"
            ? content.projects.button.closed
            : project.status == "EM BREVE"
            ? content.projects.button.soon
            : null}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-2">{project.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription>{project.description}</CardDescription>
      </CardContent>

      <CardFooter>
        {project.status === "FREE" ? (
          <Link href={project.href} target="_blank" className="w-full">
            <Button
              variant="default"
              size="sm"
              className="w-full shadow-lg bg-[var(--second-background)]"
            >
              {content.projects.button.learnMore}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : project.status === "ENCERRADO" ? (
          <Button
            variant="default"
            size="sm"
            className="w-full shadow-lg bg-[var(--second-background)]"
          >
            {content.projects.button.closed}{" "}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        ) : project.status === "EM BREVE" ? (
          <Button
            variant="default"
            size="sm"
            className="w-full shadow-lg bg-[var(--second-background)]"
          >
            {content.projects.button.soon}{" "}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
