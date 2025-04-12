export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterJson {
  [language: string]: {
    professor: {
      name: string;
      description: string;
      social: FooterLink[];
    };
    quickLinks: string[];
    disciplines: string[];
    legal: string[];
    copyright: string;
  };
}
