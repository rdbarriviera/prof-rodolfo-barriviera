"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Cookie } from "lucide-react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const CookieConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    } else if (consent === "true") {
      loadAnalytics();
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "true", { expires: 365 });
    setShowBanner(false);
    loadAnalytics();
  };

  const handleDecline = () => {
    Cookies.set("cookie_consent", "false", { expires: 365 });
    setShowBanner(false);
  };

  const loadAnalytics = () => {
    if (!window.gtag) {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"; // troca aqui
      script.async = true;
      document.body.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => {
        window.dataLayer.push(args);
      };
    }

    window.gtag("js", new Date());
    window.gtag("config", "G-XXXXXXXXXX"); // e aqui também
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className=" fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md lg:max-w-lg z-50"
        >
          <Card className="high-contrast-border overflow-hidden border-0 shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-1.5">
              <div className="flex items-center gap-2 px-3 py-1.5 text-white">
                <Shield className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Política de Cookies
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="mb-4 flex items-start gap-3">
                <div className="mt-1 rounded-full bg-emerald-100 p-2 text-blue-600">
                  <Cookie className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[var(--primary-color)] mb-1 text-sm font-semibold">
                    Sua privacidade é importante
                  </h3>
                  <p className="text-[var(--foreground)] text-sm">
                    Usamos cookies para melhorar sua experiência e coletar dados
                    analíticos para aprimorar nossos serviços.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDecline}
                  className="high-contrast-border border-gray-200 text-[var(--foreground)] hover:bg-gray-100 hover:text-gray-900"
                >
                  Recusar
                </Button>
                <Button
                  size="sm"
                  onClick={handleAccept}
                  className="high-contrast-border bg-blue-600 text-white hover:bg-blue-700"
                >
                  Aceitar cookies
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
