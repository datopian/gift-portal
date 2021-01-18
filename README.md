GIFT Data Portal. GIFT is Global Initiative on Fiscal Transparency.

<div align="center">
  
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/datopian/gift-portal/issues)
![gift-portal](https://github.com/datopian/gift-portal/workflows/gift-portal/badge.svg)
[![The MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://opensource.org/licenses/MIT)

</div>

# Developers

This site is built using Next.JS and Portal.JS.

## Getting Started

<br/>

### Environment

To run this app will require an `.env` file with following keys:

- GITHUB_APIKEY : API key to access github required data, [click here for more information](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token).

- ORGANISATION_REPO : Github Organization login name (Same as the one that you created the token)

- PRIVATE_KEY : Private Key to generate authorization token to communicate with giftless

<br />

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## E2E Test

To test the app end to end using cypress:

```bash
yarn e2e
# or
npm run e2e
```

## Unit Tests

The unit tests are using jest.  
To add more tests you should follow the structure to add new ones inside `__tests__` directory.  
To run tests you can run with the following commands:  
<br />

> Just run the tests

```bash
npm run test
# or
yarn test
```

<br />

> Run Tests with hot reload

```bash
npm run test:watch
# or
yarn test:watch
```

<br />

## Updating the Publisher

To update the Publisher app for `gift-portal` :

```bash
// clone the gift-publisher repo

$ git clone https://github.com/datopian/gift-publisher.git

// checkout to npmpackage branch

$ git checkout origin npmpackage

```

All update which are to be reflected in `gift-portal` publisher app should be done in branch `npmpackage` of `gift-publisher` and also make sure no `css`
is included. Hence, if the new update actually need css styling, work on the `master` branch to test the styling.

Once the styling is done, copy the new update to `npmpackage` branch excluding the css and then publish to npm. To infuse into `gift-portal`:

1. Update the `giftpub` version in the `package.json`
2. run `yarn` to install the new update
3. to make sure your css reflect in `gift-portal` copy all styling into `styles/pub.css`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

```

```
