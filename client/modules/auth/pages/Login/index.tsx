import Link from 'next/link';

import { motion } from 'framer-motion';

import Input from '../../../../UI/components/Input';
import Button from '../../../../UI/components/Button';

import styles from '../../styles/pages/login.module.scss';
import auth from '../../styles/index.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

enum Field {
  Email = 'email',
  Password = 'password',
}

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please provide a valid email address')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Please provide a valid email address'
    )
    .required('Email address is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .test(
      'uppercase',
      'Password must contain at least one uppercase letter',
      (value) => /[A-Z]/.test(value)
    )
    .test(
      'lowercase',
      'Password must contain at least one lowercase letter',
      (value) => /[a-z]/.test(value)
    )
    .test('number', 'Password must contain at least one digit', (value) =>
      /\d/.test(value)
    )
    .test(
      'specialChar',
      'Password must contain at least one special character',
      (value) => /[!@#$%^&*()]/.test(value)
    ),
});

const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

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
          type="email"
          label="Email"
          errors={errors}
          name={Field.Email}
          register={register}
        />

        <Input
          type="password"
          errors={errors}
          label="Password"
          register={register}
          name={Field.Password}
        />

        <div className={styles.remember_forgot}>
          <Input type="radio" name="remember" label="Remember me" />
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
