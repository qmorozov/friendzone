import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

const Home: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <div>{t('hello')}</div>
      <Link href="/" locale="en">
        <h2>EN</h2>
      </Link>
      <Link href="/" locale="ru">
        <h2>RU</h2>
      </Link>
    </>
  );
};

export default Home;
