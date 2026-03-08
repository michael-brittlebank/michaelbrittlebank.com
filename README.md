[![Build Status](https://travis-ci.org/michael-brittlebank/michaelbrittlebank.com.svg?branch=master)](https://travis-ci.org/michael-brittlebank/michaelbrittlebank.com)

# MichaelBrittlebank.com

## Description

- This is my personal site: [https://www.michaelbrittlebank.com/](https://www.michaelbrittlebank.com/)

## Architecture

- v.6.0 (2026) - [Bun](https://bun.com/) with [Next.js](https://nextjs.org/)
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
bun install
```

Then run the development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

## Publishing a new version

Use the npm version command like

```
npm version patch
```

to update the package.json and create a tag. Run

```
bun run build
```

to build the code. Then be sure to push the tag and the code up to the remote where it can be merged into the main
branch.

```
git push —-tags origin main
```
