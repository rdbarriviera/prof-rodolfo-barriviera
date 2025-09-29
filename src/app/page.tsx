"use client";

import Lottie from "lottie-react";
import underMaintenanceAnimation from "@/components/animations/Under Maintenance.json";

// Comentar as importações para quando precisar voltar ao layout completo
// import Footer from "@/components/layout/Footer";
// import Header from "@/components/layout/Header/Header";
// import AboutSection from "@/components/sections/AboutSection";
// import ProjectsSection from "@/components/sections/ProjectsSection";
// import CoursesSection from "@/components/sections/CoursesSection";
// import TimelineSection from "@/components/sections/TimelineSection";
// import TeamSection from "@/components/sections/TeamSection";
// import { CTASection } from "@/components/sections/CtaSection";
// import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
// import CookieConsentBanner from "@/components/layout/CookieConsentBanner";
// import HeroSectionBubbles from "@/components/sections/HeroSectionBubbles";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl text-center space-y-6 sm:space-y-8 md:space-y-10">
        {/* Animação Lottie */}
        <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
          <Lottie
            animationData={underMaintenanceAnimation}
            loop={true}
            autoplay={true}
            style={{
              width: "min(280px, 80vw)",
              height: "min(280px, 80vw)",
            }}
            className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] mx-auto"
          />
        </div>

        {/* Título Principal */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 dark:text-gray-200 leading-tight">
            Em Construção
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed px-2 sm:px-4 md:px-6">
            <span className="block mt-1 sm:mt-2">
              Em breve, nosso site estará no ar!
            </span>
          </p>
        </div>

        {/* Informações de contato */}
        <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-12 mt-6 sm:mt-8 md:mt-10 p-4 sm:p-5 md:p-6 lg:p-8 bg-white/50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl md:rounded-2xl backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-lg">
          <p className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
            Para mais informações, entre em contato:
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span className="text-lg sm:text-xl md:text-2xl">📧</span>
            <p className="text-sm sm:text-base md:text-lg text-blue-600 dark:text-blue-400 font-medium break-all sm:break-normal">
              contato@prof-rodolfo.com
            </p>
          </div>
        </div>

        {/* Indicador de loading animado */}
        <div className="flex items-center justify-center space-x-1 sm:space-x-2 mt-6 sm:mt-8">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        {/* Texto adicional para mobile */}
        <div className="block sm:hidden mt-6 px-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Site otimizado para todos os dispositivos
          </p>
        </div>
      </div>
    </div>
  );
}

// Layout completo comentado para facilitar a restauração futura
/*
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <CookieConsentBanner />
      <Header />
      <main className="flex-1">
        <HeroSectionBubbles />
        <AboutSection />
        <ProjectsSection />
        <CTASection />
        <CoursesSection />
        <TimelineSection />
        <TeamSection />
        <ScrollToTopButton />
      </main>
      <Footer />
    </div>
  );
}
*/

// Layout completo comentado para facilitar a restauração futura
/*
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <CookieConsentBanner />
      <Header />
      <main className="flex-1">
        <HeroSectionBubbles />
        <AboutSection />
        <ProjectsSection />
        <CTASection />
        <CoursesSection />
        <TimelineSection />
        <TeamSection />
        <ScrollToTopButton />
      </main>
      <Footer />
    </div>
  );
}
*/
