import React, {
  FC,
  useState,
  ChangeEvent,
  cloneElement,
  ReactElement,
  JSXElementConstructor,
} from 'react';
import { classnames } from '../../../services/helper';
import { motion } from 'framer-motion';

import styles from './index.module.scss';

export type InputType =
  | 'text'
  | 'password'
  | 'number'
  | 'email'
  | 'checkbox'
  | 'radio'
  | 'textarea';

export interface IFormControl {
  error?: any;
  type?: InputType;
  label?: string;
  classes?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: ReactElement;
  children: ReactElement<any, string | JSXElementConstructor<any>> & {
    type: string;
  };
}

const FormControl: FC<IFormControl> = ({
  label,
  classes,
  error,
  type,
  disabled,
  required,
  icon,
  children,
}): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const isRadio = type === 'radio';
  const isCheckbox = type === 'checkbox';
  const isTextarea = type === 'textarea';

  const wrapperClasses = classnames({
    [styles.full]: value,
    [styles.radio]: isRadio,
    [styles.disabled]: disabled,
    [styles.checkbox]: isCheckbox,
    [styles.required]: required && !disabled,
    [styles.default]: !isCheckbox && !isRadio,
    [styles.iconWrapper]: icon !== undefined || type === 'password',
  });

  const renderTextarea = (): JSX.Element =>
    cloneElement(children as ReactElement<HTMLFormElement>, {
      onInput: (event: ChangeEvent<HTMLTextAreaElement>): void => {
        handleChange(event);
      },
    });

  const renderRadioCheckbox = (): JSX.Element => (
    <>
      {cloneElement(children as ReactElement<HTMLFormElement>, {
        type: isCheckbox ? 'checkbox' : 'radio',
      })}
      <span></span>
    </>
  );

  const renderInput = (): JSX.Element => {
    const inputProps = {
      type: showPassword ? 'text' : type,
      onInput: handleChange,
    };

    return (
      <>
        {type === 'password' && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className={styles.password_visible}
          >
            <svg viewBox="0 0 21 21" fill="none">
              <g clipPath="url(#clip0_530_49)">
                <path d="M10.5 4.59375C6.51919 4.59375 3.14869 7.07175 1.96875 10.5C3.14869 13.9282 6.51919 16.4062 10.5 16.4062C14.4808 16.4062 17.8513 13.9282 19.0312 10.5C17.8513 7.07175 14.4808 4.59375 10.5 4.59375Z" />
                <path d="M10.5 13.7812C12.3122 13.7812 13.7812 12.3122 13.7812 10.5C13.7812 8.68782 12.3122 7.21875 10.5 7.21875C8.68782 7.21875 7.21875 8.68782 7.21875 10.5C7.21875 12.3122 8.68782 13.7812 10.5 13.7812Z" />
                <motion.path
                  initial={{ pathLength: 0, strokeWidth: 0 }}
                  transition={{ duration: 0.3 }}
                  d="M1.96875 1.96875L19.0312 19.0312"
                  animate={{
                    pathLength: !showPassword ? 1 : 0,
                    strokeWidth: !showPassword ? 2 : 0,
                  }}
                />
              </g>
            </svg>
          </button>
        )}
        {icon &&
          type !== 'password' &&
          cloneElement(icon, { className: styles.icon })}
        {cloneElement(children as ReactElement<HTMLInputElement>, inputProps)}
      </>
    );
  };

  const renderFormControl = (): JSX.Element => {
    if (isCheckbox || isRadio) {
      return renderRadioCheckbox();
    } else if (isTextarea) {
      return renderTextarea();
    } else {
      return renderInput();
    }
  };

  return (
    <label
      title={`input ${label}`}
      className={`${wrapperClasses} ${classes ? classes : ''}`}
    >
      {renderFormControl()}
      {label && <p>{label}</p>}
      {error && <span style={{ color: 'red' }}>{error.message}</span>}
    </label>
  );
};

export default FormControl;
