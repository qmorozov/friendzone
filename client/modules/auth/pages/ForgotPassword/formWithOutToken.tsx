import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordValidationSchema } from '../../validation/schemaValidation';
import { ForgotPassword } from '../../dto/auth.dto';
import { AuthApi } from '../../auth.api';

import FormControl from '../../../../UI/components/FormControl';
import Button from '../../../../UI/components/Button';
import Notification from '../../../../UI/components/Notification/Notification';

import auth from '../../styles/index.module.scss';

interface IForgotPasswordFormData {
  email: string;
}

const FormWithOutToken = () => {
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timerCount, setTimerCount] = useState<number>(60);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
  });

  const handleForgotPasswordData = async ({
    email,
  }: IForgotPasswordFormData): Promise<void> => {
    if (!isTimerActive) {
      try {
        setIsTimerActive(true);
        await AuthApi.sendRequestToResetPassword(email);

        setIsEmailSent(true);

        const interval = setInterval(() => {
          setTimerCount((prevCount: number) => prevCount - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(interval);
          setIsTimerActive(false);
          setTimerCount(60);
          setIsEmailSent(false);
        }, 60000);
      } catch (error: any) {
        setIsTimerActive(false);
        setTimerCount(60);
        setIsEmailSent(false);

        setError(ForgotPassword.Email, {
          type: 'manual',
          message: error?.response?.data?.username,
        });
      }
    }
  };

  return (
    <>
      <h1 className={auth.title}>Password reset request</h1>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleForgotPasswordData)}
      >
        <FormControl
          type="email"
          label="Email"
          error={errors[ForgotPassword.Email]}
        >
          <input type="email" autoFocus {...register(ForgotPassword.Email)} />
        </FormControl>

        <Button
          classes={auth.button}
          disabled={isTimerActive}
          aria-label={
            isTimerActive
              ? `Resend the e-mail via (${timerCount})`
              : 'Send reset e-mail'
          }
        >
          {isTimerActive
            ? `Resend the e-mail via (${timerCount})`
            : 'Send reset e-mail'}
        </Button>
      </form>

      <Notification
        type="success"
        show={isEmailSent}
        text="Password reset instructions sent. Check your email"
      />
    </>
  );
};

export default FormWithOutToken;
