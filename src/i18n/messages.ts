import { defineMessages } from "react-intl";

export const messages = defineMessages({
  appTitle: {
    defaultMessage: "Repositories Search Demo",
    id: "appTitle",
    description: "Title for the whole application",
  },
  viewInGithub: {
    defaultMessage: "View in GitHub",
    id: "viewInGithub",
    description: "Repository Card's external link label",
  },
  searchButtonLabel: {
    defaultMessage: "Search",
    id: "searchButtonLabel",
    description: "Search button label of the main search box",
  },
  statsTooltip: {
    defaultMessage: "Stars and forks",
    id: "statsTooltip",
    description:
      "Tooltip content over the repository card stars and forks information",
  },
  changeTheme: {
    defaultMessage: "Change theme",
    id: "changeTheme",
    description:
      "Tooltip content over the button to switch between light and dark theme",
  },
});
