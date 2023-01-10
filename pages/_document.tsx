import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta property="og:title" content="Daniel Cazarez" />
        <meta
          property="og:image"
          content="https://horarios-isc.vercel.app/logo-og.png"
        />
        <meta property="og:description" content="Horario Escolar para ISC 8°" />
        <meta property="og:url" content="https://horarios-isc.vercel.app/" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta property="og:type" content="website" />
        <meta
          property="image"
          content="https://horarios-isc.vercel.app/logo-og.png"
        />
        <meta name="description" content="Horario Escolar para ISC 8°" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
