export interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

export interface TimelineJson {
  [language: string]: {
    sectionTitle: string;
    sectionDescription: string;
    button: string;
    items: TimelineItem[];
  };
}
