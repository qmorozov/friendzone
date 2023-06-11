import Link from 'next/link';

import { motion } from 'framer-motion';

import Button from '../../../../UI/components/Button';
import Input from '../../../../UI/components/Input';

import auth from '../../styles/index.module.scss';
import styles from '../../styles/pages/login.module.scss';
import { useForm } from 'react-hook-form';

enum Field {
  Login = 'login',
  Email = 'email',
}

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <motion.div
      className={styles.wrapper}
      animate={{ x: 0 }}
      initial={{ x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className={auth.title}>Reset your password</h1>

      <form>
        <Input
          label="Login"
          error={errors[Field.Login]?.message}
          {...register(Field.Login, {
            required: 'This field is required',
          })}
        />
        <Input
          label="E-mail"
          error={errors[Field.Email]?.message}
          {...register(Field.Email, {
            required: 'This field is required',
          })}
        />

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
