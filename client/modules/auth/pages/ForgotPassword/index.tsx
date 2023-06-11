import Link from 'next/link';

import { motion } from 'framer-motion';

import Button from '../../../../UI/components/Button';
import Input from '../../../../UI/components/Input';

import auth from '../../styles/index.module.scss';
import styles from '../../styles/pages/login.module.scss';

const ForgotPassword = () => {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ x: -20 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className={auth.title}>Reset your password</h1>

      <form>
        <Input label="Login" />
        <Input label="E-mail" />

        <Button classes={auth.button}>CONTINUE</Button>
      </form>

      <div className={auth.auth__footer}>
        <p>Go back to login screen</p>
        <Link href="/auth/login">login screen</Link>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
