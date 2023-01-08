import { RepositorySearchPagePure } from "./RepositorySearchPage.pure";
import { Meta } from "@storybook/react";
import { AppLayout } from "../../components/AppLayout";

export default {
  decorators: [(fn) => <AppLayout>{fn()}</AppLayout>],
} satisfies Meta;

export const PureLoading = () => (
  <RepositorySearchPagePure
    query="react"
    repositories={{ type: "pending" }}
    onQueryChange={() => void 0}
  />
);

export const PureError = () => (
  <RepositorySearchPagePure
    query="react"
    repositories={{
      type: "error",
      message: "Test message. It can be longer than expected.",
    }}
    onQueryChange={() => void 0}
  />
);

export const PureLoadedEmpty = () => (
  <RepositorySearchPagePure
    query="react"
    repositories={{
      type: "loaded",
      data: [],
    }}
    onQueryChange={() => void 0}
  />
);

export const PureLoaded = () => (
  <RepositorySearchPagePure
    query="react"
    repositories={{
      type: "loaded",
      data: [
        {
          id: 10270250,
          name: "react",
          owner: "facebook",
          linkUrl: "https://github.com/facebook/react",
          numForks: 41561,
          numStars: 200130,
          description:
            "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
        },
        {
          id: 75396575,
          name: "react",
          owner: "duxianwei520",
          linkUrl: "https://github.com/duxianwei520/react",
          numForks: 1701,
          numStars: 4697,
          description:
            " React+webpack+redux+ant design+axios+less全家桶后台管理框架",
        },
        {
          id: 90759930,
          name: "react",
          owner: "discountry",
          linkUrl: "https://github.com/discountry/react",
          numForks: 542,
          numStars: 1146,
          description: "React docs in Chinese | React 中文文档翻译",
        },
        {
          id: 121814210,
          name: "react",
          owner: "primer",
          linkUrl: "https://github.com/primer/react",
          numForks: 364,
          numStars: 2186,
          description:
            "An implementation of GitHub's Primer Design System using React",
        },
        {
          id: 77513419,
          name: "react",
          owner: "react-redux-antd-es6",
          linkUrl: "https://github.com/react-redux-antd-es6/react",
          numForks: 462,
          numStars: 998,
          description: "基于react的企业后台管理开发框架",
        },
        {
          id: 72628285,
          name: "react",
          owner: "Cathy0807",
          linkUrl: "https://github.com/Cathy0807/react",
          numForks: 444,
          numStars: 801,
          description: "京东首页构建",
        },
        {
          id: 43029296,
          name: "react",
          owner: "formio",
          linkUrl: "https://github.com/formio/react",
          numForks: 186,
          numStars: 225,
          description: "JSON powered forms for React.js",
        },
        {
          id: 29028775,
          name: "react-native",
          owner: "facebook",
          linkUrl: "https://github.com/facebook/react-native",
          numForks: 22752,
          numStars: 106870,
          description:
            "A framework for building native applications using React",
        },
        {
          id: 3606624,
          name: "ReactiveCocoa",
          owner: "ReactiveCocoa",
          linkUrl: "https://github.com/ReactiveCocoa/ReactiveCocoa",
          numForks: 3560,
          numStars: 19972,
          description:
            "Cocoa framework and Obj-C dynamism bindings for ReactiveSwift.",
        },
        {
          id: 332665119,
          name: "React",
          owner: "xzlaptt",
          linkUrl: "https://github.com/xzlaptt/React",
          numForks: 142,
          numStars: 219,
          description: "React学习",
        },
      ],
    }}
    onQueryChange={() => void 0}
  />
);
