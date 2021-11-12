export interface SidebarOption {
  id: number;
  iconPath: string;
  title: string;
}

export interface SidebarCollapsibleOption {
  id: number;
  iconPath: string;
  title: string;
  menu: SidebarOption[];
}

export interface Room extends SidebarOption {
  messages: string[];
}
