# ordinals poc

## Table of contents

- [Overview](#overview)
  - [Customizations](#customizations)
    - [tsconfig](#tsconfig)
    - [Prettier](#prettier)
    - [Husky](#husky)
    - [Commitlint](#commitlint)
    - [GitHub Repository](#github-repository)
    - [Environment Variables](#environment-variables)
    - [Dependencies](#dependencies)
    - [Project Structure](#project-structure)
  - [Utilities](#utilities)
  - [Guidelines](#guidelines)
    - [Styling](#styling)
    - [HTML Character Entities](#html-character-entities)
    - [NextJS Metadata](#nextjs-metadata)
  - [Getting Started](#getting-started)
    - [Dependency Installation](#dependency-installation)
    - [Environment Variables](#environment-variables-1)
    - [Start the Development Server](#start-the-development-server)
  - [Contributing](#contributing)
  - [Learn More](#learn-more)
  - [Deploy on Vercel](#deploy-on-vercel)

## Overview

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). All the default options were selected, which resulted in the following: App Router, Tailwind CSS, and TypeScript.

When navigating to the `/order-status` and `/ticker-info` dynamic routes, ensure you provide a query parameter in the URL. The error page will remind you if you end up seeing it.
The `/ticker-info` dynamic route, "Wallet Balance" card, and "Latest BTC Block Info" card have a fake delay injected to ensure loader states can be viewed.
The `/ticker-info` route loader is a Suspenseful Component interaction, while the cards use client components, and the `useFormState` hook alongside zod with asynchronous form server actions. 

Due to its prevalence, this application has a "connect wallet" function built with MetaMask in mind. Under the hood, this is powered via [WalletConnect](https://walletconnect.com/). The configuration of WalletConnect leverages QR codes for connecting wallets and instantiates a web socket connection to handle various events. You can now connect a wallet, restore a prior session, and disconnect a wallet. The following details the process of disconnecting a MetaMask wallet from the mobile Android application:

1.  Navigate to settings via the cogwheel at the bottom right of the screen
2.  Scroll down and open the "Experimental" rule set
3.  Press the blue "View sessions" button
4.  Press and hold on the "ordinals-poc" session entry
5.  Press delete

At this time, xverse does not support in-app disconnection functionality like described above for MetaMask however, you can click the "Clear Session" button to disconnect from this application.

### Customizations

While this project has been boostrapped with nextjs create-next-app, there have been some alterations made.

#### tsconfig

Additions:

- allowUnreachableCode: false
- declaration: true
- forceConsistentCasingInFileNames: true
- noFallthroughCasesInSwitch: true
- noImplicitAny: true
- noImplicitReturns: true
- pretty: true
- sourceMap: true

#### Prettier

Prettier has been added to the project along with:

- eslint-config-prettier plugin ('prettier' in eslintrc extends array)
- .prettierrc config file in root directory
- .prettierignore config file in root directory

#### Husky

Husky has been added to perform some checks on code:

- Prettier
- ESLint
- TypeScript compilation
- build script

Husky has some required modifications to scripts within package.json:

- check-types
  - TypeScript check
- check-format
  - Prettier check
- format
  - Prettier format
- validate
  - runs all of the above in one script including the default `lint` script
- validate-and-build
  - runs all of the above in once script and finishes by running the build script
- vab
  - functions as an alias for the `validate-and-build` script

Additionally, the default Husky pre-commit script has been altered. A preset from an [online guide](https://blog.jarrodwatts.com/nextjs-eslint-prettier-husky) was used with some slight tweaks. The pre-commit hook will run the equivalent of the validate-and-build script with some helpful messaging added.

#### Commitlint

Commitlint was added during the `npx -husky-init` script that starts the Husky setup process (see last section).

package additions:

- @commitlint/cli
- @commitlint/config-conventional

vscode workspace extension to add support for displaying commitlint messages within the vscode git commit window/input

#### GitHub Repository

"Always suggest updating pull request branches Loading" has been enabled.
A "classic" GitHub "Branch protection rule" has been added to protect the "main" branch. The following protection rules exist for "main" after these modifications:

- Require a pull request before merging
  - Require approvals (1)
- Dismiss stale pull request approvals when new commits are pushed
- Require conversation resolution before merging
- Require linear history

#### Environment Variables

##### .env.local

As this proof-of-concept (POC) repository is an API interaction one, a `.env.local.example` has been provided to serve as a template for provisioning sensitive information to the application at build time.

```bash
# the API key for ordinalsbot
API_KEY= api_key
# go to https://cloud.walletconnect.com to get a new project
NEXT_PUBLIC_PROJECT_ID= cloud.walletconnect.com
# go to https://accounts.blockcypher.com/tokens to get a new token
BLOCK_CYPHER_API_TOKEN= token
```

Additionally, the "Dotenv Official +Vault" vscode extension has been added to the projects Workspace Recommendations.

#### Dependencies

The following non-exhaustive list of packages are in use for this project:

- react-spinners: "A collection of react loading spinners"
- walletconnect/\*: A handful of packages from the walletconnect series.

#### Project Structure

This project has been bootstrapped with `create-next-app` with the app router configuration so, much of the structure is preordained. On top of this default structure the following changes have been made.

The addition of the following directories:

- app/ticker-info/[ticker]/TRIO

  A dynamic route that takes a ticker as a param to load ticker information all behind a suspense wrapper.

- app/order-status/[id]/some-order-id

  A dynamic route that takes an order ID as a param to load order information all behind a suspense wrapper.

- app/components/

  The eternal resting place of all components. All components found here are designed to be later used as a design library and thus, are all loosely coupled, dumb components.

  Treat this is an internal design library. This means that you should never include dependencies, other than installed node packages, within any import or export statements.

- app/lib/constants/

  Globally required constants live in here.

- app/lib/utils/

  Globally required utility functions live in here.

### Utilities

#### Inherited NextJS Functionality

NextJS 14 ships with a variety of useful tools and functionality that pair nicely with the app router configuration in use by this project.

##### Error Pages

`error.tsx` files can be created within any page route directory and will be used in the event of an application error. This allows for graceful error handling as opposed to the application locking up or revealing sensitive information.

`not-found.tsx` files function similarly to `error.tsx` files in that they can be created within any page route directory. However, they differ in that a `not-found.tsx` file will be rendered if the requested URL/route does not exist.

## Guidelines

### Styling

There are some design principles being followed throughout this projects code. A notable one that is difficult to enforce with utilities such as ESLint and Prettier is CSS naming semantics.

This project adheres to [BEM](https://getbem.com/introduction/) naming conventions for element class names. While Tailwind CSS has been opted into as part of the bootstrap `create-next-app` script, all new components are designed with new CSS to reduce any external factors breaking the component library appearances. While uncommon, large design libraries publish updates with breaking changes which can create large and mandatory development efforts to be performed to unblock work once started.

> NOTE: use custom classes cautiously when mixing with tailwind
>
> - as a general rule, your components should either rely entirely on Tailwind classes or custom classes.

### HTML Character Entities

On occasian, characters like `{' '}` or apostraphes and quotation marks will be required. One should strive to use HTML Character Entities instead of the more familiar punctuation. There are numerous resources available to cross-reference the codes you will need such as this one from [freeformatter.com/html-entities.html](https://www.freeformatter.com/html-entities.html).

### NextJS Metadata

There exists a default project metadata object that should be extended whenever defining metadata is required. Refer to the [NextJS Metadata documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

## Getting Started

### Dependency Installation

Install node packages and setup your IDE default formatter (vscode specific) to use "Prettier - Code formatter".

```bash
npm i
# or
yarn i
# or
pnpm i
```

### Environment Variables

Ensure your `.env.local` is configured accordingly. Refer to `.env.local.example`.

### Start the Development Server

If everything is configured correctly, you can now start the development server.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Contributing

To make contributions to the project:

1. checkout the `main` branch
2. sync your local branch with the origin (`git fetch && git pull`)
3. checkout a new branch. use prefixes to denote the purpose of the branch like so:

   - `git checkout -b feat/some-feature`
   - `git checkout -b bugfix/fixed-the-thing`
   - `git checkout -b task/trivial-work`
   - `git checkout -b release/v0.0.1`
   - `git checkout -b release/v0.0.2-beta.0`

4. make your code changes, and commit your changes

   This project uses [Husky](https://github.com/typicode/husky#readme) and [Commitlint](https://commitlint.js.org/) to ensure your commits are uniform to ensure swift changelog/release-note creation is possible. Read more about these tools in the [Customizations - Husky](#husky) and [Customizations - Commitlint](#commitlint) sections.

   You can manually run the various checks via the added npm scripts:

   - `check-types`, `check-format`, `format`, `validate`, `valdiate-and-build` or `vab`

5. push your branch to origin, open a PR, and request a peer review of your proposed changes

6. once your PR has been approved, merge your branch into the designated branch using the squash method. This provides an opportunity to review your commits and ensure nothing is amiss before merging changes.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
