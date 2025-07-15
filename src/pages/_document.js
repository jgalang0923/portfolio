// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Global Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Your Name or Company"/>
        <meta property="og:title" content="JGalang" />
        <meta property="og:description" content="JGalang" />
        <meta property="og:image" content="https://img.icons8.com/color/48/resume.png" />
        <meta property="og:url" content="https://jgalang.com/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="https://img.icons8.com/color/48/resume.png" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
