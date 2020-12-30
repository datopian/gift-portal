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

- GITHUB_ORG : Github Organization login name (Same as the one that you created the token)

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
>  Just run the tests
``` bash
npm run test
# or
yarn test
```
<br />

>  Run Tests with hot reload
``` bash
npm run test:watch
# or
yarn test:watch
```

<br />



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
