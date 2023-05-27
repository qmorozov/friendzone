import Link from 'next/link';

import Button from '../../../../UI/components/Button';

import styles from '../../styles/pages/registration.module.scss';
import auth from '../../styles/index.module.scss';

const Registration = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.steps}>
        <div className={styles.bar}></div>
        <span className={styles.completed}>1</span>
        <span>2</span>
        <span>3</span>
      </div>

      <h1 className={auth.title}>Welcome, login to your account!</h1>

      <form>
        <Button classes={auth.button}>Login now</Button>
      </form>

      <div className={auth.auth__footer}>
        <p>You already have an account?</p>
        <Link href="/auth/login">Log in!</Link>
      </div>
    </div>
  );
};

export default Registration;
