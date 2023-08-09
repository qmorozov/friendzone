import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import FormWithToken from './formWithToken';
import FormWithOutToken from './formWithOutToken';

import auth from '../../styles/index.module.scss';
import styles from '../../styles/pages/login.module.scss';
import authLayouts from '../../../../styles/parts/authLayouts.module.scss';

const ForgotPassword = () => {
  const router = useRouter();
  const token = router.query.token?.[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
    >
      <div className={authLayouts.auth__content_image}>
        <img src="/images/big-logo.svg" alt="logo" />
      </div>
      <div className={styles.wrapper}>
        {token ? <FormWithToken token={token} /> : <FormWithOutToken />}

        <div className={auth.auth__footer}>
          <p>Go back to the login screen</p>
          <Link href="/auth/login">Login</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
