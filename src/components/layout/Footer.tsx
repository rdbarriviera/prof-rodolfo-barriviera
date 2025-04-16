import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import footer from "@/app/messages/layout/Footer.json";
import { useLanguage } from "@/context/LanguageContext";
import type { FooterJson } from "@/types/layout/Footer";

export default function Footer() {
  const { language } = useLanguage();
  const content = (footer as FooterJson)[language];

  return (
    <footer
      id="contato"
      className="w-full border-t bg-background py-6 md:py-12"
    >
      <div className="container max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{content.professor.name}</h3>
            <p className="text-sm text-muted-foreground">
              {content.professor.description}
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/prof.rodolfobarriviera/"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://br.linkedin.com/in/profrodolfobarriviera"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{content.quickLinks[0]}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#sobre"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {content.quickLinks[1]}
                </Link>
              </li>
              <li>
                <Link
                  href="/#projetos"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {content.quickLinks[2]}
                </Link>
              </li>
              <li>
                <Link
                  href="/#cursos"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {content.quickLinks[3]}
                </Link>
              </li>
              <li>
                <Link
                  href="/#equipe"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {content.quickLinks[4]}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/termos-de-uso"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {content.legal[0]}
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas-de-privacidade"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {content.legal[1]}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} RODOLFO BARRIVIERA.{" "}
            {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
