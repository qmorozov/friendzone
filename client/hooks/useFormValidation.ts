import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const popularEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com'];

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please provide a valid email address')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Please provide a valid email address'
    )
    .required('Email address is required'),
  login: yup
    .string()
    .required('login is required')
    .matches(/^[a-zA-Z]+$/, 'Login must contain only Latin letters'),
  name: yup.string().required('name is required'),
  surname: yup.string().required('surname is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .test(
      'uppercase',
      'Password must contain at least one uppercase letter',
      (value) => /[A-Z]/.test(value)
    )
    .test(
      'lowercase',
      'Password must contain at least one lowercase letter',
      (value) => /[a-z]/.test(value)
    )
    .test('number', 'Password must contain at least one digit', (value) =>
      /\d/.test(value)
    )
    .test(
      'specialChar',
      'Password must contain at least one special character',
      (value) => /[!@#$%^&*()]/.test(value)
    ),
  city: yup.string().required('city is required'),
  age: yup
    .number()
    .typeError('Age must be a valid number')
    .required('Age is required')
    .min(18, 'You must be at least 18 years old')
    .max(120, 'Please provide a valid age'),
  description: yup.string().required('Description is required'),
});

export const useFormValidation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return { register, handleSubmit, errors };
};
