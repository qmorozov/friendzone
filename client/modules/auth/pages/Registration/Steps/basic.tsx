import React, { FC, memo, useEffect, ChangeEvent } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthApi } from '../../../auth.api';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/useAppRedux';
import { updateProfile } from '../../../store/auth';
import { RootState } from '../../../../../services/app-store';
import { registrationValidationSchema } from '../../../validation/schemaValidation';
import { basicFields, registrationSteps } from '../../../dto/auth.dto';
import { useRegistrationData } from '../registrationContext';

import Button from '../../../../../UI/components/Button';
import FormControl from '../../../../../UI/components/FormControl';

import auth from '../../../styles/index.module.scss';
import { motion } from 'framer-motion';

type RegistrationFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
};

interface IBasic {
  userPassword: string;
  setUserPassword: (userPassword: string) => void;
}

const Basic: FC<IBasic> = ({ userPassword, setUserPassword }) => {
  const { setStep, setVisibleTabs } = useRegistrationData();

  const { email, firstName, lastName, username } = useAppSelector(
    ({ auth }: RootState) => auth.user
  );

  const {
    register,
    setError,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationValidationSchema),
    defaultValues: {
      [basicFields.Email]: email,
      [basicFields.LastName]: lastName,
      [basicFields.Username]: username,
      [basicFields.FirstName]: firstName,
    },
  });

  const dispatch = useAppDispatch();

  let debounceTimer: NodeJS.Timeout;

  useEffect(() => {
    setValue(basicFields.Password, userPassword);
  }, [userPassword]);

  const handleUsername = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const userName: string = event.target.value.trim();

    if (!userName) {
      clearErrors(basicFields.Username);
      return;
    }

    try {
      const { exists }: any = await AuthApi.checkUserName(userName);

      if (exists) {
        setError(basicFields.Username, {
          type: 'manual',
          message: 'This username already exists.',
        });
      } else {
        clearErrors(basicFields.Username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedHandleUsername = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => handleUsername(event), 300);
  };

  const handleRegistrationData: SubmitHandler<RegistrationFormData> = async (
    data
  ) => {
    const { email, password, firstName, lastName, username } = data;

    if (password) setUserPassword(password);

    const registerData = {
      email,
      password,
    };

    const editData = {
      email,
      username,
      lastName,
      firstName,
    };

    try {
      const { access_token }: any = await AuthApi.createUser(registerData);

      dispatch(updateProfile(editData));

      document.cookie = `access_token=${encodeURIComponent(
        access_token
      )}; path=/`;

      if (isValid) {
        setStep(registrationSteps.additional);
        setVisibleTabs((prevState: any) => ({
          ...prevState,
          [registrationSteps.additional]: false,
        }));
      }
    } catch (error: any) {
      setError(basicFields.Email, {
        type: 'custom',
        message: error.response?.data?.message,
      });
    }
  };

  return (
    <>
      <h1 className={auth.title}>Basic information</h1>

      <motion.form
        className={auth.form}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.75,
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleRegistrationData)}
      >
        <FormControl
          label="Login"
          defaultValue={username}
          error={errors[basicFields.Username] as FieldError}
        >
          <input
            {...register(basicFields.Username)}
            onChange={debouncedHandleUsername}
          />
        </FormControl>

        <FormControl
          label="Email"
          defaultValue={email}
          error={errors[basicFields.Email] as FieldError}
        >
          <input {...register(basicFields.Email)} />
        </FormControl>

        <fieldset>
          <FormControl
            label="First name"
            defaultValue={firstName}
            error={errors[basicFields.FirstName] as FieldError}
          >
            <input {...register(basicFields.FirstName)} />
          </FormControl>

          <FormControl
            label="Last name"
            defaultValue={lastName}
            error={errors[basicFields.LastName] as FieldError}
          >
            <input {...register(basicFields.LastName)} />
          </FormControl>
        </fieldset>

        <FormControl
          type="password"
          label="Password"
          defaultValue={userPassword}
          error={errors[basicFields.Password] as FieldError}
        >
          <input type="password" {...register(basicFields.Password)} />
        </FormControl>

        <Button classes={auth.button} aria-label="Continue">
          CONTINUE
        </Button>
      </motion.form>
    </>
  );
};

export default memo(Basic);
