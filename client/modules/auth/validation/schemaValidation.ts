import * as yup from 'yup';
import { additionalField, basicFields } from '../dto/auth.dto';

export const registrationValidationSchema = yup.object().shape({
  [basicFields.Email]: yup
    .string()
    .required('Email address is required')
    .email('Email address is invalid')
    .test('emailFormat', 'Email address is invalid', (value) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value) && value.includes('.');
    }),
  [basicFields.FirstName]: yup
    .string()
    .required('First name is required')
    .matches(/^[A-Za-z]+$/, 'First name must contain only letters'),
  [basicFields.LastName]: yup
    .string()
    .required('Surname is required')
    .matches(/^[A-Za-z]+$/, 'Surname must contain only letters'),
  [basicFields.Username]: yup
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
  [basicFields.Password]: yup
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
});

export const additionalValidationSchema = yup.object().shape({
  [additionalField.Description]: yup
    .string()
    .required('Description is required')
    .min(15, 'Description must be at least 15 characters')
    .max(150, 'Description can be at most 150 characters'),
  [additionalField.SocialMediaUrls]: yup
    .array()
    .of(yup.string().url('Invalid URL format')),
});
