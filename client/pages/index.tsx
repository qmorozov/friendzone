import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../hooks/useAppRedux';
import Input from '../UI/components/Input';

const Home: NextPage = () => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  return (
    <>
      <div>{t('hello')}</div>
      <Link href="/" locale="en">
        <h2>EN</h2>
      </Link>
      <Link href="/" locale="ru">
        <h2>RU</h2>
      </Link>
      <h1>{auth.user.firstName}</h1>
      <Input label="text" />
      {/*<button onClick={() => dispatch(incremented())}>+</button>*/}
      {/*<button onClick={() => dispatch(decremented())}>-</button>*/}
    </>
  );
};

export default Home;
