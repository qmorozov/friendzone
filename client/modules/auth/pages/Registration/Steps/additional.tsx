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

  const handleAddSocialMediaField = () => {
    if (socialMediaFields.length < 6) {
      setSocialMediaFields((prevFields) => [
        ...prevFields,
        prevFields.length + 1,
      ]);
    }
  };

  const handleDeleteSocialMediaField = (index: number) => {
    const updatedFields = socialMediaFields.filter((_, i) => i !== index);
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

  const handleAdditionalData = (data: any) => {
    console.log(data);
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
          {socialMediaFields.map((field, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <FormControl
                icon={
                  index > 0 ? (
                    <motion.button
                      type="button"
                      onClick={() => handleDeleteSocialMediaField(index)}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
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
                    </motion.button>
                  ) : null
                }
                label={`Social Media URL #${field}`}
                error={errors[Field.SocialMediaUrls]?.[field - 1]}
              >
                <input {...register(`socialMediaUrls.${field - 1}`)} />
              </FormControl>
            </motion.div>
          ))}
        </AnimatePresence>

        {socialMediaFields.length < 6 && (
          <motion.button
            type="button"
            className={auth.add__field}
            onClick={handleAddSocialMediaField}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <svg viewBox="0 0 39 39" fill="none" className={auth.add__field}>
              <path d="M10 18.6499h18v1h-18v-1z" />
              <path
                d="M18.6504 28h18v1h-18v-1z"
                transform="rotate(-90 18.6504 28)"
              />
              <path d="M0.3 0.3h38.4v38.4H0.3V0.3z" />
            </svg>
          </motion.button>
        )}

        <Button classes={auth.button} type="submit">
          CONTINUE
        </Button>
      </motion.form>
    </>
  );
};

export default Additional;
