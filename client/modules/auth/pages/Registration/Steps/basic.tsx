import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../../../UI/components/Button';
import FormControl from '../../../../../UI/components/FormControl';

import auth from '../../../styles/index.module.scss';

enum Field {
  Age = 'age',
  Name = 'name',
  City = 'city',
  Login = 'login',
  Email = 'email',
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
  [Field.Name]: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Za-z]+$/, 'Name must contain only letters'),
  [Field.LastName]: yup
    .string()
    .required('Surname is required')
    .matches(/^[A-Za-z]+$/, 'Surname must contain only letters'),
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
  [Field.Age]: yup
    .number()
    .typeError('Age must be a valid number')
    .required('Age is required')
    .min(18, 'You must be at least 18 years old')
    .max(120, 'Please provide a valid age'),
});

const Basic = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationValidationSchema),
  });

  const handleRegistrationData = (data: any): void => {
    console.log(data);
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
        <FormControl label="Login" error={errors[Field.Login]}>
          <input {...register(Field.Login)} />
        </FormControl>

        <FormControl label="Email" error={errors[Field.Email]}>
          <input {...register(Field.Email)} />
        </FormControl>

        <fieldset>
          <FormControl label="Name" error={errors[Field.Name]}>
            <input {...register(Field.Name)} />
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

          <FormControl label="Age" error={errors[Field.Age]}>
            <input {...register(Field.Age)} />
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
