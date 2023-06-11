import Link from 'next/link';

import { motion } from 'framer-motion';

import Input from '../../../../UI/components/Input';
import Button from '../../../../UI/components/Button';

import styles from '../../styles/pages/login.module.scss';
import auth from '../../styles/index.module.scss';
import { useForm } from 'react-hook-form';

enum Field {
  Email = 'email',
  Password = 'password',
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginData = (data: any): void => {
    console.log(data);
  };

  return (
    <motion.div
      className={styles.wrapper}
      animate={{ x: 0 }}
      initial={{ x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className={auth.title}>Welcome, login to your account!</h1>

      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleLoginData)}
      >
        <Input
          label="Email"
          error={errors[Field.Email]?.message}
          {...register(Field.Email, {
            required: 'This field is required',
          })}
        />
        <Input
          type="password"
          label="Password"
          error={errors[Field.Password]?.message}
          {...register(Field.Password, {
            required: 'This field is required',
          })}
        />

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
