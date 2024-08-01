# ordinal poc

## preamble

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

### Prettier

Prettier has been added to the project along with:

- eslint-config-prettier plugin ('prettier' in eslintrc extends array)
- .prettierrc config file in root directory
- .prettierignore config file in root directory

### .gitignore

Additions:

- yarn.lock
- package-lock.json

### Husky

Husky has been added to perform some checks on code:

- Prettier
- ESLint
- TypeScript compilation
- build script

Husky has some required modification to scripts within package.json:

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

### Commitlint

Commitlint was added during the `npx -husky-init` script that starts the Husky setup process (see last section).

package additions:

- @commitlint/cli
- @commitlint/config-conventional

vscode workspace extension to add support for displaying commitlint messages within the vscode git commit window/input

### create-next-app code change

instances of `{' '}` have been replaced with `&nbsp;`

## Getting Started

Install node packages and setup your IDE default formatter (vscode specific) to use "Prettier - Code formatter".

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
