import { createInMemorySearchClient } from "../../../../../common/api/clients/development/inMemorySearchClient";
import { Repository } from "../../../types";
import { IntlProvider } from "react-intl";

export const testCommon = [
  {
    id: 0,
    description: "desc0",
    owner: "owner0",
    name: "react0",
    numStars: 100,
    numForks: 200,
    linkUrl: "https://google.com",
  },
  {
    id: 1,
    description: "desc1",
    owner: "owner1",
    name: "react01",
    numStars: 101,
    numForks: 201,
    linkUrl: "https://google.com",
  },
  {
    id: 2,
    description: "desc2",
    owner: "owner2",
    name: "react012",
    numStars: 102,
    numForks: 202,
    linkUrl: "https://google.com",
  },
  {
    id: 3,
    description: "desc3",
    owner: "owner3",
    name: "react0123",
    numStars: 103,
    numForks: 203,
    linkUrl: "https://google.com",
  },
];

export const inMemorySearchClient = createInMemorySearchClient<Repository>(
  testCommon,
  (query, item) => item.name.toLowerCase().includes(query.trim().toLowerCase())
);

export const renderOptions = {
  wrapper: (props: {}) => <IntlProvider locale="en" {...props} />,
};
