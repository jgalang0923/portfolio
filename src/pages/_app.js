import Head from 'next/head';
import "@/styles/globals.css";
export default function App({ Component, pageProps }) {
  return(
        <>
      <Head>
        <title>JGalang</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="JGalang"/>
        <meta property="og:title" content="JGalang" />
        <meta property="og:description" content="JGalang" />
        <meta property="og:image" content="https://www.jgalang.com/images/logo-1200.webp" />
        <meta property="og:url" content="https://jgalang.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="icon" href="/images/logo.webp" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
