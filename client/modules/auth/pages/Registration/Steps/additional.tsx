import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { additionalValidationSchema } from '../../../validation/schemaValidation';
import { AdditionalField, RegistrationSteps } from '../../../dto/auth.dto';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/useAppRedux';
import { updateProfile } from '../../../store/auth';
import { RootState } from '../../../../../services/app-store';
import { useRegistrationData } from '../registrationContext';

import Button from '../../../../../UI/components/Button';
import FormControl from '../../../../../UI/components/FormControl';

import auth from '../../../styles/index.module.scss';

type AdditionalFormData = {
  description: string;
  socialMediaUrls: string[];
};

const Additional = () => {
  const { setStep, setVisibleTabs } = useRegistrationData();

  const dispatch = useAppDispatch();

  const { description, socialMedia } = useAppSelector(
    ({ auth }: RootState) => auth.user
  );

  const [socialMediaFields, setSocialMediaFields] = useState<number[]>([1]);

  const {
    reset,
    register,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(additionalValidationSchema),
    defaultValues: {
      [AdditionalField.Description]: description,
      [AdditionalField.SocialMediaUrls]: socialMedia,
    },
  });

  useEffect(() => {
    if (socialMedia.length > 0) {
      setSocialMediaFields(
        Array.from(
          { length: socialMedia.length },
          (_, index: number) => index + 1
        )
      );
    }
  }, [socialMedia]);

  const handleAddSocialMediaField = (): void => {
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
    delete updatedErrors[AdditionalField.SocialMediaUrls]?.[index];

    const updatedValues = getValues();
    updatedValues?.socialMediaUrls?.splice(index, 1);

    reset({
      ...updatedValues,
      [AdditionalField.SocialMediaUrls]: updatedValues.socialMediaUrls,
    });

    clearErrors();
  };

  const handleAdditionalData = (additionalData: any): void => {
    const { description, socialMediaUrls } = additionalData;

    const filteredSocialMediaUrls = socialMediaUrls.filter(
      (url: string) => url !== ''
    );

    const filteredData = {
      description,
      socialMedia: filteredSocialMediaUrls,
    };

    dispatch(updateProfile(filteredData));

    if (isValid) {
      setStep(RegistrationSteps.interests);
      setVisibleTabs((prevState: any) => ({
        ...prevState,
        [RegistrationSteps.interests]: false,
      }));
    }
  };

  return (
    <>
      <h1 className={auth.title}>Additional information</h1>

      <form
        noValidate
        autoComplete="off"
        className={auth.form}
        onSubmit={handleSubmit(handleAdditionalData)}
      >
        <FormControl
          label="Bio"
          type="textarea"
          defaultValue={description}
          error={errors[AdditionalField.Description]}
        >
          <textarea {...register(AdditionalField.Description)} />
        </FormControl>

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
            defaultValue={socialMedia[index]}
            label={`Social Media URL #${field}`}
            error={errors[AdditionalField.SocialMediaUrls]?.[index]}
          >
            <input
              {...register(`${AdditionalField.SocialMediaUrls}.${index}`)}
            />
          </FormControl>
        ))}

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
      </form>
    </>
  );
};

export default Additional;
