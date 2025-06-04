"use client";

import { motion } from "framer-motion";
import Qualifications from "@/app/messages/sections/FloatingQualifications.json";
import type {
  QualificationsItem,
  QualificationsTranslations,
} from "@/types/sections/FloatingQualifications";
import { useLanguage } from "@/context/LanguageContext";
export default function FloatingQualifications() {
  const { language } = useLanguage();

  const content = (Qualifications as QualificationsTranslations)[language];

  const QualificationsItems: QualificationsItem[] = content.items;

  return (
    <div className="py-12 px-4 relative">
      <div className="max-w-xl md:max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col space-y-4">
          {QualificationsItems.map((item, index) => {
            // Determine position: first is center, then alternating left/right
            let position = "self-center";
            if (index > 0) {
              position = index % 2 === 1 ? "self-start" : "self-end";
            }

            return (
              <motion.div
                key={index}
                className={`qualification-item ${position}`}
                initial={{
                  opacity: 0,
                  scale: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.3,
                  type: "spring",
                  stiffness: 80,
                  damping: 12,
                  mass: 1,
                }}
              >
                <motion.div
                  className="text-[var(--foreground)] text-xs sm:text-md md:text-lg font-medium text-center px-4 py-2 bg-[var(--background)]/80 bg-opacity-90 backdrop-blur-sm rounded-full shadow-blue border border-gray-200 high-contrast-border"
                  initial={{
                    scale: 0.8,
                  }}
                  animate={{
                    scale: 1,
                    y: [0, -3, 0, 3, 0],
                  }}
                  transition={{
                    scale: {
                      duration: 0.6,
                      delay: index * 0.3 + 0.8,
                      type: "spring",
                      stiffness: 100,
                    },
                    y: {
                      duration: 4 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: index * 0.3 + 1.5,
                    },
                  }}
                >
                  {item}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
