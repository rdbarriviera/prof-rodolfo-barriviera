export interface ProjectItem {
  title: string;
  description: string;
  status: "FREE" | "ENCERRADO" | "EM BREVE";
  image: string;
  href: string;
}

export interface ProjectsJson {
  [language: string]: {
    projects: {
      title: string;
      subtitle: string;
      button: {
        seeMore: string;
        soon: string;
        closed: string;
        learnMore: string;
      };
      items: ProjectItem[];
    };
  };
}
