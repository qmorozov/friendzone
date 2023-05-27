import { FC } from 'react';
import Head from 'next/head';

interface IDocumentHead {
  title: string;
}

const DocumentHead: FC<IDocumentHead> = ({ title }) => {
  return (
    <Head>
      <title>{title} | FriendZone</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&family=Overpass:wght@700&family=Roboto:wght@400;700;900&display=swap"
      />
      <link
        sizes="180x180"
        rel="apple-touch-icon"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        sizes="32x32"
        type="image/png"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        sizes="16x16"
        type="image/png"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        color="#5bbad5"
        href="/favicon/safari-pinned-tab.svg"
      />
      <meta name="theme-color" content="black" />
    </Head>
  );
};

export default DocumentHead;
