import Link from 'next/link';
import { motion } from 'framer-motion';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AuthApi } from '../../auth.api';
import { useAppDispatch } from '../../../../hooks/useAppRedux';
import { updateProfile } from '../../store/auth';
import { LoginField } from '../../dto/auth.dto';
import { loginValidationSchema } from '../../validation/schemaValidation';

import Button from '../../../../UI/components/Button';
import FormControl from '../../../../UI/components/FormControl';

import styles from '../../styles/pages/login.module.scss';
import auth from '../../styles/index.module.scss';
import authLayouts from '../../../../styles/parts/authLayouts.module.scss';

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const Login = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const dispatch = useAppDispatch();

  const handleLoginData = async ({
    email,
    password,
    rememberMe,
  }: LoginData): Promise<void> => {
    try {
      const { access_token }: any = await AuthApi.loginUserGetToken({
        email,
        password,
      });

      if (rememberMe) {
        document.cookie = `access_token=${encodeURIComponent(
          access_token
        )}; path=/;`;
      }

      try {
        const {
          firstName,
          lastName,
          location,
          hobbies,
          languages,
          settings,
          pictures,
          socialMedia,
          username,
        }: any = await AuthApi.loginUserByToken(access_token);

        dispatch(
          updateProfile({
            firstName,
            lastName,
            email,
            location,
            hobbies,
            languages,
            settings,
            pictures,
            socialMedia,
            username,
          })
        );
      } catch (error) {
        console.error(error);
      }
    } catch (error: any) {
      setError(LoginField.Email, {
        type: 'manual',
        message: error?.response?.data?.message,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.75,
      }}
    >
      <div className={authLayouts.auth__content_image}>
        <img src="/images/big-logo.svg" alt="logo" />
      </div>
      <div className={styles.wrapper}>
        <h1 className={auth.title}>Welcome, login to your account!</h1>

        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleLoginData)}
        >
          <FormControl label="Email" error={errors[LoginField.Email]}>
            <input type="email" {...register(LoginField.Email)} />
          </FormControl>

          <FormControl
            type="password"
            label="Password"
            error={errors[LoginField.Password]}
          >
            <input type="password" {...register(LoginField.Password)} />
          </FormControl>

          <div className={styles.remember_forgot}>
            <FormControl type="checkbox" label="Remember me">
              <input type="checkbox" {...register(LoginField.RememberMe)} />
            </FormControl>

            <Link href="/auth/forgot-password">Forgot password</Link>
          </div>

          <Button classes={auth.button} aria-label="Login now" type="submit">
            Login now
          </Button>
        </form>

        <div className={auth.auth__footer}>
          <p>Don’t have an account yet?</p>
          <Link href="/auth/registration">Sign up!</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
