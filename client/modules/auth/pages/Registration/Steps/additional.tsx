import { motion, AnimatePresence } from 'framer-motion';
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
    .of(yup.string().url('Invalid URL format')),
});

const Additional = () => {
  const [socialMediaFields, setSocialMediaFields] = useState<number[]>([1]);

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

  const handleAddSocialMediaField = () => {
    setSocialMediaFields((prevFields: number[]) => [
      ...prevFields,
      prevFields.length + 1,
    ]);
  };

  const handleDeleteSocialMediaField = (index: number): void => {
    setSocialMediaFields((prevFields: number[]) =>
      prevFields.filter((_: number, i: number) => i !== index)
    );

    setSocialMediaFields((prevFields: number[]) =>
      prevFields.map((_: number, i: number) => i + 1)
    );

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

  const handleAdditionalData = (additionalData: any): void => {
    const { description, socialMediaUrls } = additionalData;

    const filteredSocialMediaUrls = socialMediaUrls.filter(
      (url: string) => url !== ''
    );

    const filteredData = {
      description: description,
      socialMediaUrls: filteredSocialMediaUrls,
    };

    console.log(filteredData);
  };

  return (
    <>
      <h1 className={auth.title}>Additional information</h1>

      <motion.form
        noValidate
        autoComplete="off"
        className={auth.form}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(handleAdditionalData)}
      >
        <FormControl
          label="Bio"
          type="textarea"
          error={errors[Field.Description]}
        >
          <textarea {...register(Field.Description)} />
        </FormControl>

        <AnimatePresence>
          {socialMediaFields.map((field: number, index: number) => (
            <FormControl
              key={index}
              icon={
                index > 0 ? (
                  <button
                    type="button"
                    aria-label="Remove field for social media url"
                    onClick={() => handleDeleteSocialMediaField(index)}
                  >
                    <svg
                      fill="none"
                      viewBox="0 0 26 26"
                      className={auth.remove_field}
                    >
                      <path
                        d="M6.11621 19.1165h18v1.5h-18v-1.5z"
                        transform="rotate(-45 6.11621 19.1165)"
                      />
                      <path
                        d="M18.8447 19.6111h18v1.5h-18v-1.5z"
                        transform="rotate(-135 18.8447 19.6111)"
                      />
                    </svg>
                  </button>
                ) : null
              }
              label={`Social Media URL #${field}`}
              error={errors[Field.SocialMediaUrls]?.[index]}
            >
              <input {...register(`${Field.SocialMediaUrls}.${index}`)} />
            </FormControl>
          ))}
        </AnimatePresence>

        {socialMediaFields.length < 4 && (
          <button
            type="button"
            className={auth.add__field}
            onClick={handleAddSocialMediaField}
            aria-label="Add new field for social media url"
          >
            <svg viewBox="0 0 39 39" fill="none" className={auth.add__field}>
              <path d="M10 18.6499h18v1h-18v-1z" />
              <path
                d="M18.6504 28h18v1h-18v-1z"
                transform="rotate(-90 18.6504 28)"
              />
              <path d="M0.3 0.3h38.4v38.4H0.3V0.3z" />
            </svg>
          </button>
        )}

        <Button classes={auth.button} type="submit" aria-label="Continue">
          CONTINUE
        </Button>
      </motion.form>
    </>
  );
};

export default Additional;
