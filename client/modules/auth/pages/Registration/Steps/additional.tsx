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
    register,
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

  const handleAdditionalData = (data: any): void => {
    console.log(data);
  };

  return (
    <>
      <h1 className={auth.title}>Additional information</h1>

      <motion.form
        className={auth.form}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleAdditionalData)}
      >
        <FormControl
          label="Bio"
          type="textarea"
          error={errors[Field.Description]}
        >
          <textarea {...register(Field.Description)} />
        </FormControl>

        {socialMediaFields.map((field) => (
          <FormControl
            key={field}
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
