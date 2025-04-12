"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Timeline from "@/app/messages/sections/TimelineSection.json";
import { useLanguage } from "@/context/LanguageContext";
import type {
  TimelineJson,
  TimelineItem,
} from "@/types/sections/TimelineSection";

export default function TimelineSection() {
  const { language } = useLanguage();
  const content = (Timeline as TimelineJson)[language];

  const timelineItems: TimelineItem[] = content.items;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
      <div className="container px-4 md:px-6 max-w-[1200px] mx-auto">
        <motion.div
          ref={ref}
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {content.sectionTitle}
            </h2>
            <p className="text-sm mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {content.sectionDescription}
            </p>
          </div>
        </motion.div>
        <div className="mx-auto max-w-3xl py-12">
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative mb-12 flex items-center justify-between"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <div
                  className={`w-5/12 ${
                    index % 2 === 0
                      ? "text-right pr-6 md:pr-8"
                      : "order-last text-left pl-6 md:pl-8"
                  }`}
                >
                  <h3 className="text-sm  md:text-lg font-bold">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div className="absolute left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-blue-400 text-primary-foreground">
                  <Calendar className="h-5 w-5" />
                </div>
                <div
                  className={`w-5/12 ${
                    index % 2 === 0
                      ? "order-last text-left pl-8"
                      : "text-right pr-8"
                  }`}
                >
                  <span className="font-bold">{item.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link href="http://lattes.cnpq.br/6966615403860909">
                <Button variant="outline">
                  {content.button}
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
