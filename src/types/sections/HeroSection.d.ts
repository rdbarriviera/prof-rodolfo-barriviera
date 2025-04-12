export type Language = "pt" | "en";

export type HeroContent = {
  title: string;
  description: string;
  cta: string;
};

export type HeroJson = Record<Language, HeroContent>;
