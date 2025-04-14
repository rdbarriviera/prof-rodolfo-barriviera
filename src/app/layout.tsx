import type React from "react";
import "@/app/globals.css";
import { Poppins } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700", "800"],
});
export const metadata = {
  title: "Prof. Rodolfo Barriviera",
  description: "Ajudando as pessoas a prosperarem através da tecnologia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={poppins.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
