import Link from 'next/link';

import Input from '../../../../UI/components/Input';
import Button from '../../../../UI/components/Button';

import styles from '../../styles/pages/login.module.scss';

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Welcome, login to your account!</h1>
      <form>
        <Input label="Email" />
        <Input label="Password" type="password" />
        <div className={styles.remember_forgot}>
          <Input type="radio" label="Remember me" name="remember" />
          <Link href="/auth/forgot-password">Forgot password</Link>
        </div>
        <Button>Login now</Button>
      </form>
      <div className={styles.create_account}>
        <p>Don’t have an account yet?</p>
        <Link href="/auth/registration">Sign up!</Link>
      </div>
    </div>
  );
};

export default Login;
