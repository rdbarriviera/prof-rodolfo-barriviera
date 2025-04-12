type MenuItem = {
  label: string;
  href: string;
};

type MenuContent = {
  menu: MenuItem[];
  cv: string;
};

type MenuTranslations = {
  pt: MenuContent;
  en: MenuContent;
};

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
