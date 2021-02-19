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

```
NEXT_PUBLIC_ORG_NAME= GitHub Organization login name (same as the one that you created the token with)

PRIVATE_KEY= Private key to generate authorization token to communicate with Giftless

GIFTLESS_SERVER= URL from Giftless server

APP_GITHUB_KEY= API key to access GitHub required data, follow this documentation: https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token

REFRESH_DATA_IN_METASTORE= Set if the metastore data will refresh automatically


// To get the following information, you can check this link: https://docs.github.com/en/developers/apps/creating-a-github-app

GITHUB_CLIENT_ID= GitHub client ID from APP

GITHUB_CLIENT_SECRET= GitHub client secret

SIGNING_KEY= Signin key to use on APP from GitHub

NEXTAUTH_URL= GitHub login callback URL
```
<br />

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## E2E Test

To test the app end to end using Cypress:

```bash
yarn e2e
# or
npm run e2e
```

## Unit Tests

The unit tests are using `jest`. To add more tests, you should follow the structure to add new ones inside `__tests__` directory.
You can run the tests with the following commands:
<br />

> Just run the tests

```bash
npm run test
# or
yarn test
```

<br />

> Run tests with hot reload

```bash
npm run test:watch
# or
yarn test:watch
```

<br />

## Updating the Publisher

To update the Publisher app for `gift-portal`:

```bash
# clone the gift-publisher repo
$ git clone https://github.com/datopian/gift-publisher.git

# checkout to npmpackage branch
$ git checkout origin npmpackage
```

All updates which are to be reflected in `gift-portal` publisher app should be done in the branch `npmpackage` of `gift-publisher` and also make sure no `css` is included. Hence, if the new update actually needs CSS styling, work on the `master` branch to test the styling.

Once the styling is done, copy the new update to `npmpackage` branch excluding the CSS and then publish to `npm`. To infuse into `gift-portal`:

1. Update the `giftpub` version in the `package.json`
2. Run `yarn` to install the new update
3. To make sure your CSS reflect in `gift-portal` copy all styling into `styles/pub.css`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

<br />

## User Cookie

After you log in using GitHub, you can access the user information encrypted inside a cookie.

The object stored follows the scope below:

```json
{
  "user": {
    "name": "John Doe",
    "email": "johndoe@email.com",
    "image": "https://avatars3.githubusercontent.com/u/1111111?v=4",
    "login": "johndoe",
    "token": {
      "provider": "github",
      "type": "oauth",
      "id": 1122345412,
      "accessToken": "222db22ba22f2b2bdb2ef22222fa2e2c0a223567",
      "accessTokenExpires": null
    }
  }
}
```
