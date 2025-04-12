export interface CtaJson {
  pt: {
    title: string;
    description: string;
    cta: {
      title: string;
      buttons: {
        platform: string;
        link: string;
        buttonText: string;
      }[];
    };
  };
  en: {
    title: string;
    description: string;
    cta: {
      title: string;
      buttons: {
        platform: string;
        link: string;
        buttonText: string;
      }[];
    };
  };
}
