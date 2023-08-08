import * as yup from 'yup';
import {
  AdditionalField,
  BasicFields,
  ForgotPassword,
  ForgotPasswordWithToken,
  LoginField,
} from '../dto/auth.dto';

export const registrationValidationSchema = yup.object().shape({
  [BasicFields.Email]: yup
    .string()
    .required('Email address is required')
    .email('Email address is invalid')
    .test('emailFormat', 'Email address is invalid', (value: string) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value) && value.includes('.');
    }),
  [BasicFields.FirstName]: yup
    .string()
    .required('First name is required')
    .matches(/^[A-Za-z]+$/, 'First name must contain only letters'),
  [BasicFields.LastName]: yup
    .string()
    .required('Surname is required')
    .matches(/^[A-Za-z]+$/, 'Surname must contain only letters'),
  [BasicFields.Username]: yup
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
  [BasicFields.Password]: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .test(
      'uppercase',
      'Password must contain at least one uppercase letter (A-Z)',
      (value: string) => /[A-Z]/.test(value)
    )
    .test(
      'lowercase',
      'Password must contain at least one lowercase letter (a-z)',
      (value: string) => /[a-z]/.test(value)
    )
    .test(
      'number',
      'Password must contain at least one digit (0-9)',
      (value: string) => /\d/.test(value)
    )
    .test(
      'specialChar',
      'Password must contain at least one special character (!@#$%^&*())',
      (value: string) => /[!@#$%^&*()]/.test(value)
    ),
});

export const additionalValidationSchema = yup.object().shape({
  [AdditionalField.Description]: yup
    .string()
    .required('Description is required')
    .min(15, 'Description must be at least 15 characters')
    .max(150, 'Description can be at most 150 characters'),
  [AdditionalField.SocialMediaUrls]: yup
    .array()
    .of(yup.string().url('Invalid URL format')),
});

export const loginValidationSchema = yup.object().shape({
  [LoginField.Email]: yup
    .string()
    .required('Email address is required')
    .email('Email address is invalid')
    .test('emailFormat', 'Email address is invalid', (value: string) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value) && value.includes('.');
    }),
  [LoginField.Password]: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .test(
      'uppercase',
      'Password must contain at least one uppercase letter (A-Z)',
      (value: string) => /[A-Z]/.test(value)
    )
    .test(
      'lowercase',
      'Password must contain at least one lowercase letter (a-z)',
      (value: string) => /[a-z]/.test(value)
    )
    .test(
      'number',
      'Password must contain at least one digit (0-9)',
      (value: string) => /\d/.test(value)
    )
    .test(
      'specialChar',
      'Password must contain at least one special character (!@#$%^&*())',
      (value) => /[!@#$%^&*()]/.test(value)
    ),
  [LoginField.RememberMe]: yup.boolean(),
});

export const forgotPasswordWithTokenValidationSchema = yup.object().shape({
  [ForgotPasswordWithToken.Password]: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .test(
      'uppercase',
      'Password must contain at least one uppercase letter (A-Z)',
      (value: string) => /[A-Z]/.test(value)
    )
    .test(
      'lowercase',
      'Password must contain at least one lowercase letter (a-z)',
      (value: string) => /[a-z]/.test(value)
    )
    .test(
      'number',
      'Password must contain at least one digit (0-9)',
      (value: string) => /\d/.test(value)
    )
    .test(
      'specialChar',
      'Password must contain at least one special character (!@#$%^&*())',
      (value) => /[!@#$%^&*()]/.test(value)
    ),
  [ForgotPasswordWithToken.ConfirmPassword]: yup
    .string()
    .required('Confirm password is required')
    .oneOf(
      [yup.ref(ForgotPasswordWithToken.Password)],
      'Passwords do not match'
    ),
});

export const forgotPasswordValidationSchema = yup.object().shape({
  [ForgotPassword.Email]: yup
    .string()
    .required('Email address is required')
    .email('Email address is invalid')
    .test('emailFormat', 'Email address is invalid', (value: string) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value) && value.includes('.');
    }),
});
