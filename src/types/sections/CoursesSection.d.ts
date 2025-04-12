export interface CourseItem {
  title: string;
  description: string;
  status: "Disponível" | "EM BREVE";
  image: string;
  href: string;
  buttonText: string;
}

export interface CoursesJson {
  [language: string]: {
    sectionTitle: string;
    sectionDescription: string;
    button: {
      soon: string;
    };
    items: CourseItem[];
  };
}
