import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contato"
      className="w-full border-t bg-background py-6 md:py-12"
    >
      <div className="container max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Prof. Rodolfo Barriviera</h3>
            <p className="text-sm text-muted-foreground">
              Ajudando as pessoas a prosperarem através da tecnologia.
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
              <Link
                href="https://www.facebook.com/profrodolfobarriviera/?locale=pt_BR"
                className="text-muted-foreground hover:text-foreground"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#sobre"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/#projetos"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link
                  href="/#cursos"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cursos
                </Link>
              </li>
              <li>
                <Link
                  href="/#equipe"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Equipe
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Disciplinas</h3>
            <ul className="space-y-2 text-sm">
              <li>Sistemas Operacionais</li>
              <li>Arquitetura de Computadores</li>
              <li>Redes de Computadores</li>
              <li>Segurança de Sistemas</li>
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
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link
                  href="/politicas-de-privacidade"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Políticas de privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} RODOLFO BARRIVIERA. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
