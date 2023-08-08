import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordWithTokenValidationSchema } from '../../validation/schemaValidation';
import { ForgotPasswordWithToken } from '../../dto/auth.dto';

import FormControl from '../../../../UI/components/FormControl';
import Button from '../../../../UI/components/Button';

import auth from '../../styles/index.module.scss';

interface IForgotPasswordFormData {
  password: string;
  confirmPassword: string;
}

const FormWithToken = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordWithTokenValidationSchema),
  });

  const handleResetPassword = async ({
    password,
    confirmPassword,
  }: IForgotPasswordFormData): Promise<void> => {
    console.log(password);
    console.log(confirmPassword);
  };

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
    </>
  );
};

export default FormWithToken;
