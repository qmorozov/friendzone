import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../../../UI/components/Button';
import FormControl from '../../../../../UI/components/FormControl';

import auth from '../../../styles/index.module.scss';

enum Field {
  Description = 'description',
  SocialMediaUrls = 'socialMediaUrls',
}

const additionalValidationSchema = yup.object().shape({
  [Field.Description]: yup.string().required('Description is required'),
  [Field.SocialMediaUrls]: yup
    .array()
    .of(yup.string().url('Invalid URL format').required('URL is required')),
});

const Additional = () => {
  const [socialMediaFields, setSocialMediaFields] = useState([1]);

  const {
    reset,
    register,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(additionalValidationSchema),
  });

  const handleAddSocialMediaField = (): void => {
    if (socialMediaFields.length < 6) {
      setSocialMediaFields([
        ...socialMediaFields,
        socialMediaFields.length + 1,
      ]);
    }
  };

  const handleDeleteSocialMediaField = (index: number): void => {
    const updatedFields = [...socialMediaFields];
    updatedFields.splice(index, 1);
    setSocialMediaFields(updatedFields);

    const updatedErrors = { ...errors };
    delete updatedErrors[Field.SocialMediaUrls]?.[index];

    const updatedValues = getValues();
    updatedValues?.socialMediaUrls?.splice(index, 1);

    reset({
      ...updatedValues,
      [Field.SocialMediaUrls]: updatedValues.socialMediaUrls,
    });

    clearErrors();
  };

  const handleAdditionalData = (data: any): void => {
    console.log(data);
  };

  return (
    <>
      <h1 className={auth.title}>Additional information</h1>

      <motion.form
        noValidate
        autoComplete="off"
        className={auth.form}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
        onSubmit={handleSubmit(handleAdditionalData)}
      >
        <FormControl
          label="Bio"
          type="textarea"
          error={errors[Field.Description]}
        >
          <textarea {...register(Field.Description)} />
        </FormControl>

        {socialMediaFields.map((field, index) => (
          <FormControl
            key={field}
            icon={
              index > 0 ? (
                <button
                  type="button"
                  onClick={() => handleDeleteSocialMediaField(index)}
                >
                  <svg
                    fill="none"
                    viewBox="0 0 20 20"
                    className={auth.remove_field}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.21 6.25H3.78918C3.67186 6.24953 3.55977 6.29854 3.48046 6.38499C3.40114 6.47144 3.36195 6.58732 3.37251 6.70417L4.44501 18.4842C4.52303 19.3427 5.24292 20.0001 6.10501 20H13.8942C14.7563 20.0001 15.4762 19.3427 15.5542 18.4842L16.625 6.70417C16.6354 6.58767 16.5964 6.47216 16.5175 6.38584C16.4386 6.29939 16.327 6.25009 16.21 6.25ZM8.54335 17.0833C8.54335 17.4285 8.26353 17.7083 7.91835 17.7083C7.57318 17.7083 7.29336 17.4285 7.29336 17.0833V9.58334C7.29336 9.23816 7.57318 8.95834 7.91835 8.95834C8.26353 8.95834 8.54335 9.23816 8.54335 9.58334V17.0833ZM12.085 17.7083C12.4302 17.7083 12.71 17.4285 12.71 17.0833V9.58334C12.71 9.23816 12.4302 8.95834 12.085 8.95834C11.7398 8.95834 11.46 9.23816 11.46 9.58334V17.0833C11.46 17.4285 11.7398 17.7083 12.085 17.7083Z"
                    ></path>
                    <path
                      fillRule="evenodd"
                      d="M14.375 3.33333H18.3333C18.7936 3.33333 19.1667 3.70643 19.1667 4.16667C19.1667 4.6269 18.7936 5 18.3333 5H1.66667C1.20643 5 0.833332 4.6269 0.833332 4.16667C0.833332 3.70643 1.20643 3.33333 1.66667 3.33333H5.625C5.68025 3.33333 5.73324 3.31138 5.77231 3.27231C5.81138 3.23324 5.83333 3.18025 5.83333 3.125V2.08333C5.83333 0.93274 6.76607 0 7.91667 0H12.0833C13.2339 0 14.1667 0.93274 14.1667 2.08333V3.125C14.1667 3.24006 14.2599 3.33333 14.375 3.33333ZM7.5 2.08333V3.125C7.5 3.24006 7.59327 3.33333 7.70833 3.33333H12.2917C12.4067 3.33333 12.5 3.24006 12.5 3.125V2.08333C12.5 1.85321 12.3135 1.66667 12.0833 1.66667H7.91667C7.68655 1.66667 7.5 1.85321 7.5 2.08333Z"
                    ></path>
                  </svg>
                </button>
              ) : null
            }
            label={`Social Media URL #${field}`}
            error={errors[Field.SocialMediaUrls]?.[field - 1]}
          >
            <input {...register(`socialMediaUrls.${field - 1}`)} />
          </FormControl>
        ))}

        {socialMediaFields.length < 6 && (
          <Button onClick={handleAddSocialMediaField} type="button">
            Add Field
          </Button>
        )}

        <Button classes={auth.button} type="submit">
          CONTINUE
        </Button>
      </motion.form>
    </>
  );
};

export default Additional;
