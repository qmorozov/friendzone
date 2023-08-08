import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordValidationSchema } from '../../validation/schemaValidation';
import { ForgotPassword } from '../../dto/auth.dto';
import { AuthApi } from '../../auth.api';

import FormControl from '../../../../UI/components/FormControl';
import Button from '../../../../UI/components/Button';

import auth from '../../styles/index.module.scss';

interface IForgotPasswordFormData {
  email: string;
}

const FormWithOutToken = () => {
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timerCount, setTimerCount] = useState<number>(60);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
  });

  const handleForgotPasswordData = async ({
    email,
  }: IForgotPasswordFormData): Promise<void> => {
    try {
      await AuthApi.sendRequestToResetPassword(email);

      setIsTimerActive(true);
      const interval = setInterval(() => {
        setTimerCount((prevCount: number) => prevCount - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        setIsTimerActive(false);
        setTimerCount(60);
      }, 60000);
    } catch (error) {
      console.log(error);
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
          <input type="email" {...register(ForgotPassword.Email)} />
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
    </>
  );
};

export default FormWithOutToken;
