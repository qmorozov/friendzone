import { FC, useEffect, useState } from 'react';
import { AuthApi } from '../../auth.api';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordWithTokenValidationSchema } from '../../validation/schemaValidation';
import { ForgotPasswordWithToken } from '../../dto/auth.dto';

import FormControl from '../../../../UI/components/FormControl';
import Button from '../../../../UI/components/Button';
import Notification from '../../../../UI/components/Notification/Notification';

import auth from '../../styles/index.module.scss';

interface IForgotPasswordFormData {
  password: string;
  confirmPassword: string;
}

interface IFormWithToken {
  token: string;
}

const FormWithToken: FC<IFormWithToken> = ({ token }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordWithTokenValidationSchema),
  });
  const { push } = useRouter();

  const [userId, setUserId] = useState<string>('');
  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false);

  const handleResetPassword = async ({
    password,
  }: IForgotPasswordFormData): Promise<void> => {
    try {
      if (token && password && userId) {
        await AuthApi.changeUserPassword({
          userId,
          password,
          token,
        });

        setValue(ForgotPasswordWithToken.Password, '');
        setValue(ForgotPasswordWithToken.ConfirmPassword, '');

        setIsPasswordChanged(true);

        setTimeout(() => {
          setIsPasswordChanged(false);
        }, 1000);
      }
    } catch (error: any) {
      console.log(error);
      setIsPasswordChanged(false);
    }
  };

  useEffect(() => {
    console.log(isPasswordChanged);
  }, [isPasswordChanged]);

  const getUserUUID = async (token: string): Promise<void> => {
    try {
      const { userId }: any = await AuthApi.getUserUUIDForResetPassword(token);

      setUserId(userId[0]);
    } catch (error) {
      push('/');
    }
  };

  useEffect(() => {
    if (token) getUserUUID(token);
  }, [token]);

  return (
    <>
      <h1 className={auth.title}>Create a new password</h1>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <FormControl
          label="Password"
          type="password"
          error={errors[ForgotPasswordWithToken.Password]}
        >
          <input
            autoFocus
            type="password"
            {...register(ForgotPasswordWithToken.Password)}
          />
        </FormControl>
        <FormControl
          type="password"
          label="Confirm password"
          error={errors[ForgotPasswordWithToken.ConfirmPassword]}
        >
          <input
            type="password"
            {...register(ForgotPasswordWithToken.ConfirmPassword)}
          />
        </FormControl>

        <Button classes={auth.button} aria-label="Create a new password">
          Create a new password
        </Button>
      </form>

      <Notification
        type="success"
        show={isPasswordChanged}
        onClose={() => push('/auth/login')}
        text="Password changed. Redirect to login page"
      />
    </>
  );
};

export default FormWithToken;
