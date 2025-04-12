export interface MenuItem {
  label: string;
  href: string;
}

export interface MenuContent {
  items: MenuItem[];
}

export interface MenuTranslations {
  pt: MenuContent;
  en: MenuContent;
}
