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
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export default DocumentHead;
