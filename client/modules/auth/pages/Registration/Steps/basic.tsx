import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthApi } from '../../../auth.api';
import { getCookie } from '../../../../../services/helper';

import Button from '../../../../../UI/components/Button';
import FormControl from '../../../../../UI/components/FormControl';

import auth from '../../../styles/index.module.scss';
import { ChangeEvent } from 'react';

enum Field {
  FirstName = 'firstName',
  City = 'city',
  Username = 'username',
  Email = 'email',
  Country = 'country',
  Password = 'password',
  LastName = 'lastName',
}

const registrationValidationSchema = yup.object().shape({
  [Field.Email]: yup
    .string()
    .required('Email address is required')
    .email('Email address is invalid')
    .test('emailFormat', 'Email address is invalid', (value) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value) && value.includes('.');
    }),
  [Field.FirstName]: yup
    .string()
    .required('First name is required')
    .matches(/^[A-Za-z]+$/, 'First name must contain only letters'),
  [Field.LastName]: yup
    .string()
    .required('Surname is required')
    .matches(/^[A-Za-z]+$/, 'Surname must contain only letters'),
  [Field.Username]: yup
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
  [Field.City]: yup.string().required('City is required'),
  [Field.Country]: yup.string().required('Country is required'),
});

const Basic = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationValidationSchema),
  });

  let debounceTimer: NodeJS.Timeout;

  const handleUsername = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const userName = event.target.value as string;

    try {
      const userNameResult = await AuthApi.checkUserName(userName);
      console.log(userNameResult);
    } catch (error: any) {
      console.log(error);
    }
  };

  const debouncedHandleUsername = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => handleUsername(event), 500);
  };

  const handleRegistrationData = async (data: any): Promise<void> => {
    const { email, password, firstName, lastName, city, country, username } =
      data;

    const registerData = {
      email,
      password,
    };

    const editData = {
      username,
      firstName,
      lastName,
      location: {
        city,
        country,
      },
    };

    try {
      const { access_token }: any = await AuthApi.createUser(registerData);

      const pastDate = new Date(0);
      document.cookie = `accessToken=${access_token}; expires=${pastDate.toUTCString()}; path=/`;

      console.log(getCookie('accessToken'));
    } catch (error: any) {
      setError(Field.Email, {
        type: 'custom',
        message: error.response.data.message,
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
        <FormControl label="Login" error={errors[Field.Username]}>
          <input
            {...register(Field.Username)}
            onChange={debouncedHandleUsername}
          />
        </FormControl>

        <FormControl label="Email" error={errors[Field.Email]}>
          <input {...register(Field.Email)} />
        </FormControl>

        <fieldset>
          <FormControl label="First name" error={errors[Field.FirstName]}>
            <input {...register(Field.FirstName)} />
          </FormControl>

          <FormControl label="Last name" error={errors[Field.LastName]}>
            <input {...register(Field.LastName)} />
          </FormControl>
        </fieldset>

        <FormControl
          type="password"
          label="Password"
          error={errors[Field.Password]}
        >
          <input type="password" {...register(Field.Password)} />
        </FormControl>

        <fieldset>
          <FormControl label="City" error={errors[Field.City]}>
            <input {...register(Field.City)} />
          </FormControl>

          <FormControl label="Country" error={errors[Field.Country]}>
            <input {...register(Field.Country)} />
          </FormControl>
        </fieldset>

        <Button classes={auth.button} aria-label="Continue">
          CONTINUE
        </Button>
      </motion.form>
    </>
  );
};

export default Basic;
