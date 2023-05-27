import { FC } from 'react';
import Head from 'next/head';

interface IDocumentHead {
  title: string;
}

const DocumentHead: FC<IDocumentHead> = ({ title }) => {
  return (
    <Head>
      <title>{`${title} | FriendZone`}</title>
    </Head>
  );
};

export default DocumentHead;
