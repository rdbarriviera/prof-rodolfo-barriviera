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
import Course from "@/app/messages/sections/CoursesSection.json";
import { useLanguage } from "@/context/LanguageContext";
import type { CoursesJson, CourseItem } from "@/types/sections/CoursesSection";
import SectionHeader from "../layout/SectionHeader";

interface CourseCardProps {
  course: CourseItem;
  onAccessClick: (course: CourseItem) => void;
}

export default function CoursesSection() {
  const { language } = useLanguage();
  const content = (Course as CoursesJson)[language];
  const courses: CourseItem[] = content.items;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Carousel state
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Modal control state
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  const handleAccessClick = (course: CourseItem) => {
    if (course.status !== "EM BREVE") {
      setSelectedCourse(course);
      setShowModal(true);
    }
  };

  const handleSubmitEmail = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(content.modal.errorMessageModal);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          courseName: selectedCourse?.title,
          courseLink: selectedCourse?.href,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Erro do servidor:", data.error);
        setError("Erro ao enviar o email. Tente novamente.");
        return;
      }

      console.log("Email enviado com sucesso:", data);

      setShowModal(false);
      window.open(selectedCourse?.href, "_blank");
    } catch (err) {
      console.error("Erro inesperado:", err);
      setError(content.modal.errorProcessMessageModal);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="cursos"
      className="w-full py-12 md:py-24 lg:py-32 bg-[var(--second-background)]"
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
            <SectionHeader title={content.sectionTitle} />
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {content.sectionDescription}
            </p>
          </div>
        </motion.div>

        {isDesktop ? (
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
                <CourseCard course={course} onAccessClick={handleAccessClick} />
              </motion.div>
            ))}
          </div>
        ) : (
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
                  <CourseCard
                    course={courses[current]}
                    onAccessClick={handleAccessClick}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              className="high-contrast-border absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-background hover:bg-muted text-foreground rounded-full p-2 z-10 shadow-md"
              onClick={prev}
              aria-label="Curso anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              className="high-contrast-border absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-background hover:bg-muted text-foreground rounded-full p-2 z-10 shadow-md"
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
                  className={`high-contrast-border h-2 w-2 rounded-full transition-all duration-300 ${
                    current === index ? "bg-primary w-6" : "bg-muted-foreground"
                  }`}
                  aria-label={`Ir para curso ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal fora do grid! */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setShowModal(false)}
          ></div>
          <div
            className="relative max-w-md w-full bg-[var(--second-background)] high-contrast-border rounded-xl shadow-2xl overflow-hidden z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/60"></div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-center text-[var(--primary-color)]">
                {content.modal.titleModal}
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                {content.modal.descriptionModal}
              </p>

              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder={content.modal.emailModal}
                    className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                  )}
                </div>

                <Button
                  className="w-full py-6 text-base font-medium high-contrast-border bg-[var(--primary-color)] text-[var(--button-foreground)]"
                  onClick={handleSubmitEmail}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? content.modal.processButton
                    : content.modal.titleButton}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  {content.modal.descriptionWarningModal}
                </p>
              </div>
            </div>

            <button
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => setShowModal(false)}
              aria-label="Fechar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function CourseCard({ course, onAccessClick }: CourseCardProps) {
  return (
    <Card className="high-contrast-border h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
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
        <Button
          variant="default"
          size="sm"
          className="high-contrast-border w-full group shadow-lg bg-[var(--second-background)]"
          onClick={() => onAccessClick(course)}
        >
          <BookOpen className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          {course.status === "EM BREVE" ? course.buttonText : course.buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
