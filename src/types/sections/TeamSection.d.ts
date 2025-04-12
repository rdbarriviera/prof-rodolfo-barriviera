export interface TeamItem {
  name: string;
  role: string;
  image: string;
  href: string;
}

export interface TeamJson {
  [language: string]: {
    sectionTitle: string;
    sectionDescription: string;
    items: TeamMember[];
  };
}
