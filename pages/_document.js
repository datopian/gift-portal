/* eslint-disable max-len */
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Karla&display=swap" rel="stylesheet"></link>

          {/* <!-- Favicon --> */}
          <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png"></link>
          <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png"></link>
          <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png"></link>
          <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png"></link>
          <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png"></link>
          <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png"></link>
          <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png"></link>
          <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png"></link>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png"></link>
          <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png"></link>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"></link>
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png"></link>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"></link>
          <link rel="manifest" href="/favicon/manifest.json"></link>
          <meta name="msapplication-TileColor" content="#ffffff"></meta>
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"></meta>
          <meta name="theme-color" content="#ffffff"></meta>
        </Head>
        <body>
          <Main />
        </body>
        <NextScript />
      </Html>
    )
  }
}
