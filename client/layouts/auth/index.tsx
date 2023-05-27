import { FC, ReactNode } from 'react';
import DocumentHead from '../_head';

import styles from '../../styles/parts/authLayouts.module.scss';
import Button from '../../UI/components/Button';

export interface IAuthLayout {
  title: string;
  children: ReactNode;
}

const AuthLayout: FC<IAuthLayout> = ({ children, title }) => {
  const defaultTitle = 'Auth';

  return (
    <section className={styles.auth}>
      <DocumentHead title={title || defaultTitle} />

      <div className={styles.auth__decor}>
        <img
          src="/images/auth-bg.webp"
          alt="Auth Background"
          className={styles.auth__background}
        />
      </div>

      <div className={styles.auth__content}>
        <div className={styles.auth__content_container}>
          <img src="/images/big-logo.png" />

          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
