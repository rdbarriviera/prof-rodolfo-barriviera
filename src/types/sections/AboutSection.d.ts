export interface AboutSectionContent {
  title: string;
  intro: string;
  paragraphs: string[];
  buttons: {
    projects: string;
    contact: string;
    curriculum: string;
  };
}

export interface AboutSectionTranslations {
  pt: AboutSectionContent;
  en: AboutSectionContent;
}

export type AboutJson = Record<Language, AboutContent>;
