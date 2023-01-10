# Listing Repositories

## Verifications


### Local development.

First, copy `.env` to `.env.local` file and provide your GitHub developer token.

Then you can start with 
```shell
npm start
```

The repository also has configured `commitlint` and prettier and eslint git hooks.

### Build & lint

In order to check typescript or eslint error, run the following command:

```shell
npm run build --ci
```

### Tests

Unit tests can be executed with this command:

```shell
npm test
```

End-to-end tests are held by Chromatic, and are available through online console.
You can access them from [GitHub Actions](https://github.com/adamborowski/react-arch-demo/actions)
and Pull Request check links or the [Invite link](https://www.chromatic.com/start?inviteToken=c1f1799677414c5ea8c88c4a7fe6e323&appId=63bc6c85068cfb74e4b8240d).

See [Online Chromatic Storybook](https://www.chromatic.com/library?appId=63bc6c85068cfb74e4b8240d&branch=master).

### GitHub Actions

This repository contains following github actions run on master`s push and every PR to master branch.
* [Storybook Deployment](https://github.com/adamborowski/react-arch-demo/actions/workflows/chromatic.yml)
* [Build & Lint](https://github.com/adamborowski/react-arch-demo/actions/workflows/build.yml)
* [Unit & integration tests](https://github.com/adamborowski/react-arch-demo/actions/workflows/test.yml)

### Component-Driven development

You can start storybook and see important component use cases and interactive scenarios.

```shell
npm run storybook
```

Please see `Client In Memory Mock` story for dynamic scenario (Play feature)

## Architecture

My main goal in this task is demonstrate the specific implementation of the architectural
pattern called [functional core, imperative shell](https://kennethlange.com/functional-core-imperative-shell/)
I found pretty simple and useful for medium-sized applications.

**Disclaimer**: for performance questions regarding simple top-down props passing, I can refer to [react-fast-context](https://github.com/adamborowski/passionware/tree/master/packages/react-fast-context) for example.

In this demo application I separated `view`, `interaction` and `IO` and allow them to be easily substituted.

View layer consists of pure components that rely mainly on props and do not have any business level state.
It can be composed of other components with separate responsibilities: pure page, layout, data display.

Then we have state layer which cares about async interactions and holds the state.
This usually composes custom interaction hooks (separated from UI) and pure view component

Last layer is the client layer which provides the actual implementation for every IO operation.

In addition to that, we have component concepts:

- Display component, i.e. `RepositoriesEmptyMessage`, `RepositoriesList`
- Layout component, i.e. `RepositoriesSearchPageLayout` which cares about css layouts
- Page pure component which usually represents one big UI feature / routing page and is pure (no state and side effects), i.e. `RepositoriesSearchPagePure`
- Page connected component which integrates pure page with special interaction hook (state, side effects), i.e. `RepositoriesSearchPageConnected`

Connected Page component is likely to accept only I/O clients as props.

Client is a set of functions that start IO operations and return a promise.

The goal of the client concept is to easily change the IO implementation depending on the use case.
We can have separate client for storybook or testing (in memory client), or fetch, graphql, local storage - for production.
We also can have adapters that allow to use one client that accepts data in a specific shape and transforms into a local structure.
This enables easy switching between backend versions that may differ in the schema.
After all, we can use `zod`, the powerful typescript-first schema library that allows us for very easy runtime validation of I/O data structures.

In addition to that we can have higher order clients (`withFailing`, `withDelay`) that make it very simple to reproduce scenarios that are hard to reproduce in development environments.

Thanks to that we don't need to mock or hack our code at all!
And in combination with storybook, we can have all popular use cases available to reproduce in one menu.



## What's new to me

- first time using Chakra UI, previous experience with:
  - Ant Design
  - Material Design
  - Cloudinary Design System (maintainer, will be open sourced)
  - Semantic UI
  - React-Bootstrap
- first time using GraphQL
  - using raw GraphQL at the thinnest layer
  - not using react-query or Apollo
    - I wanted to present the clean and simple architecture,
    - it requires that we have an abstract "client" interface that is promise-based


## What's not included

- Pagination is not implemented, it loads first 50 records.
  - my existing virtual scroll with data fetching [example](https://adamborowski.github.io/imdb-hooks) (search for "spider" and scroll) with [source](https://github.com/adamborowski/imdb-hooks/tree/master/src/aspects/list)
- Not doing browser checking, prepared for newest Google Chrome
- Routing - would use react-router but this time it would be small ROI for one page


Project generated using [Create React App](https://create-react-app.dev/),