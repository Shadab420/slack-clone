import { SidebarCollapsibleOption, SidebarOption } from "@/types/sidebar";

export const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    iconPath: require("../assets/sidebar/comment.png"),
    title: "Threads",
  },

  {
    id: 2,
    iconPath: require("../assets/sidebar/like.png"),
    title: "Mentions & reactions",
  },

  {
    id: 3,
    iconPath: require("../assets/sidebar/draft.png"),
    title: "Saved items",
  },
  {
    id: 4,
    iconPath: require("../assets/sidebar/bookmark.png"),
    title: "Channel browser",
  },
  {
    id: 5,
    iconPath: require("../assets/sidebar/group.png"),
    title: "People & user groups",
  },
  {
    id: 6,
    iconPath: require("../assets/sidebar/apps.png"),
    title: "Apps",
  },
  {
    id: 7,
    iconPath: require("../assets/sidebar/file.png"),
    title: "File browser",
  },
  {
    id: 8,
    iconPath: require("../assets/sidebar/up.png"),
    title: "Show less",
  },
];

export const sidebarCollapsibleOptions: SidebarCollapsibleOption[] = [
  {
    id: 1,
    iconPath: require("../assets/sidebar/down.png"),
    title: "Channels",
    menu: [
      {
        id: 1,
        iconPath: require("../assets/sidebar/plus.png"),
        title: "Add channel",
      },
    ],
  },
];
