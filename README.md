# DHIS2 Dashboard Widget Template

## Description

A template to bootstrap a DHIS2 dashboard widget

## Features

- Auto login during development
- Proxy implementation
- Support of `@dhis/app-runtime`
- Example of basic `useDataQuery` implementation
- Build and packaging scripts
- Deployment script

## Getting started

Open this [template](https://github.com/hisptz/dhis2-dashboard-widget-template) in GitHub and select "Use this
template".

Set up an `.env`. Check the example `.env.example` for variables to set up.

## Available Scripts

```shell
 yarn dev
```

Runs the widget in development mode. It first starts the proxy to the specified DHIS2 instance, then starts the app.
In development mode, the app first authenticates to the DHIS2 instance (see implementation in `src/main.tsx`).

```shell
yarn build
```

Builds the application using vite. It then packages the app in a bundle ready for deployment

```shell
yarn deploy
```

Deploys the application to the specified DHIS2 instance. Run `d2 app scripts deploy --help` for more information about
this command
