import Link from 'next/link';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../../UI/components/Button';
import FormControl from '../../../../UI/components/FormControl';

import auth from '../../styles/index.module.scss';
import styles from '../../styles/pages/login.module.scss';
import { useAppDispatch } from '../../../../hooks/useAppRedux';
import { useEffect } from 'react';
import { setIsComponentMounted } from '../../../store/global';

enum Field {
  Login = 'login',
  Email = 'email',
}

const forgotPasswordValidationSchema = yup.object().shape({
  [Field.Email]: yup
    .string()
    .required('Email address is required')
    .email('Email address is invalid')
    .test('emailFormat', 'Email address is invalid', (value) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value) && value.includes('.');
    }),
  [Field.Login]: yup
    .string()
    .required('Login is required')
    .matches(
      /^(?=.*[a-zA-Z]){3}[a-zA-Z0-9]*$/,
      'Login must contain at least three Latin letters'
    )
    .test(
      'atLeastThreeLetters',
      'Login must contain at least three letters',
      (value) => {
        const letterRegex = /[a-zA-Z]/g;
        const lettersCount = value.match(letterRegex)?.length || 0;
        return lettersCount >= 3;
      }
    ),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
  });

  const handleForgotPasswordData = (data: any): void => {
    console.log(data);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsComponentMounted(true));

    return () => {
      dispatch(setIsComponentMounted(false));
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.75,
      }}
    >
      <div className={styles.auth__content_image}>
        <img src="/images/big-logo.svg" alt="logo" />
      </div>
      <div className={styles.wrapper}>
        <h1 className={auth.title}>Reset your password</h1>

        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleForgotPasswordData)}
        >
          <FormControl label="Login" error={errors[Field.Login]}>
            <input {...register(Field.Login)} />
          </FormControl>

          <FormControl label="Email" type="email" error={errors[Field.Email]}>
            <input type="email" {...register(Field.Email)} />
          </FormControl>

          <Button classes={auth.button} aria-label="Continue">
            CONTINUE
          </Button>
        </form>

        <div className={auth.auth__footer}>
          <p>Go back to login screen</p>
          <Link href="/auth/login">Login</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
