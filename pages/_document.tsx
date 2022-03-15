import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg" href="/favicon.svg" />

        <meta name="apple-mobile-web-app-capable" content="yes" />

        <meta name="description" content="Node unblocker + Games list + 🦐" />
        <meta name="theme-color" content="#1e1e1e" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Node Unblocker" />
        <meta name="twitter:title" content="Node unblocker" />
        <meta
          name="twitter:description"
          content="Node unblocker + Games list + 🦐"
        />
        <meta
          name="twitter:image"
          content="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/shrimp_1f990.png"
        />

        <meta property="og:title" content="Node Unblocker" />
        <meta
          property="og:description"
          content="Node unblocker + Games list + 🦐"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://games.oliveman.dev/" />
        <meta
          property="og:image"
          content="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/shrimp_1f990.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
