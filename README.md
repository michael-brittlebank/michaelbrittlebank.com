[![Build Status](https://travis-ci.org/michael-brittlebank/michaelbrittlebank.com.svg?branch=master)](https://travis-ci.org/michael-brittlebank/michaelbrittlebank.com)

# MichaelBrittlebank.com

## Description

- This is my personal site: [https://www.michaelbrittlebank.com/](https://www.michaelbrittlebank.com/)

## Architecture

- v.5.0 (2022) - [NX](https://nx.dev/) with [Next.js](https://nextjs.org/)
  and [TypeScript](https://www.typescriptlang.org/)
- v.4.0 (2021) - [Next.js](https://nextjs.org/)
- v.3.0 (2018) - [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- v.2.0. (2016) - Extended v1 custom frontend framework to use [Foreman](https://www.npmjs.com/package/foreman) with
  a [WordPress](https://wordpress.com/) backend
- v.1.5.1 (2015) - Custom frontend framework using [Handlebars](https://handlebarsjs.com/), [Bower](https://bower.io/),
  and [Grunt](https://gruntjs.com/) with a [Contentful](https://www.contentful.com/) backend

## Set up

First install dependencies:

```bash
pnpm install --frozen-lockfile
```

Then run the development server:

```bash
pnpm dev
```

### Creating a new library

For only TypeScript use

```
npx nx generate @nrwl/js:lib my-lib
```

for a React TypeScript library use:

```
npx nx generate @nrwl/react:lib my-lib
```

### Create a new app

```
npx nx generate @nrwl/next:app my-app
```

## Publishing a new version

Use the npm version command like

```
npm version patch
```

to update the package.json and create a tag. Run

```
pnpm export
```

to build the code. Then be sure to push the tag and the code up to the remote where it can be merged into the master
branch.

```
git push —-tags origin master
```
