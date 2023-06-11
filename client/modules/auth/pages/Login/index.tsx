import Link from 'next/link';

import { motion } from 'framer-motion';

import Input from '../../../../UI/components/Input';
import Button from '../../../../UI/components/Button';

import styles from '../../styles/pages/login.module.scss';
import auth from '../../styles/index.module.scss';

const Login = () => {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ x: -20 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className={auth.title}>Welcome, login to your account!</h1>
      <form>
        <Input label="Email" />
        <Input label="Password" type="password" />
        <div className={styles.remember_forgot}>
          <Input type="radio" label="Remember me" name="remember" />
          <Link href="/auth/forgot-password">Forgot password</Link>
        </div>

        <Button classes={auth.button}>Login now</Button>
      </form>
      <div className={auth.auth__footer}>
        <p>Don’t have an account yet?</p>
        <Link href="/auth/registration">Sign up!</Link>
      </div>
    </motion.div>
  );
};

export default Login;
