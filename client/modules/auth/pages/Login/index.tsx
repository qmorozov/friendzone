import Link from 'next/link';
import { motion } from 'framer-motion';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../../../UI/components/Button';
import FormControl from '../../../../UI/components/FormControl';

import styles from '../../styles/pages/login.module.scss';
import auth from '../../styles/index.module.scss';

enum Field {
  Email = 'email',
  Password = 'password',
}

const loginValidationSchema = yup.object().shape({
  [Field.Email]: yup
    .string()
    .required('Email address is required')
    .email('Email address is invalid')
    .test('emailFormat', 'Email address is invalid', (value) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value) && value.includes('.');
    }),
  [Field.Password]: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .test(
      'uppercase',
      'Password must contain at least one uppercase letter (A-Z)',
      (value) => /[A-Z]/.test(value)
    )
    .test(
      'lowercase',
      'Password must contain at least one lowercase letter (a-z)',
      (value) => /[a-z]/.test(value)
    )
    .test('number', 'Password must contain at least one digit (0-9)', (value) =>
      /\d/.test(value)
    )
    .test(
      'specialChar',
      'Password must contain at least one special character (!@#$%^&*())',
      (value) => /[!@#$%^&*()]/.test(value)
    ),
});

const Login = () => {
  const {
    register,
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
        <FormControl label="Email" error={errors[Field.Email]}>
          <input type="email" {...register(Field.Email)} />
        </FormControl>

        <FormControl
          type="password"
          label="Password"
          error={errors[Field.Password]}
        >
          <input type="password" {...register(Field.Password)} />
        </FormControl>

        <div className={styles.remember_forgot}>
          <FormControl type="radio" label="Remember me">
            <input type="radio" />
          </FormControl>

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
