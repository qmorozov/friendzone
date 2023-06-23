import {
  FC,
  useState,
  ChangeEvent,
  cloneElement,
  ReactElement,
  JSXElementConstructor,
} from 'react';
import { classnames } from '../../../services/helper';

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
  children,
}): JSX.Element => {
  const [value, setValue] = useState<string>('');

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newValue = event.target.value;
    setValue(newValue);
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
  });

  const renderTextarea = () =>
    cloneElement(children as ReactElement<HTMLFormElement>, {
      onInput: (event: ChangeEvent<HTMLTextAreaElement>): void => {
        handleChange(event);
      },
    });

  const renderRadioCheckbox = () => (
    <>
      {cloneElement(children as ReactElement<HTMLFormElement>, {
        type: isCheckbox ? 'checkbox' : 'radio',
      })}
      <span></span>
    </>
  );

  const renderInput = () =>
    cloneElement(children as ReactElement<HTMLFormElement>, {
      type: type,
      onInput: handleChange,
    });

  const renderFormControl = () => {
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
