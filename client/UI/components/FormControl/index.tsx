import {
  FC,
  useRef,
  useState,
  ReactNode,
  ChangeEvent,
  cloneElement,
  ReactElement,
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
  children?: ReactNode;
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

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaInput = (): void => {
    const textareaElement = textareaRef.current;
    if (textareaElement) {
      textareaElement.style.height = 'auto';
      textareaElement.style.height = `${Math.min(
        textareaElement.scrollHeight,
        150
      )}px`;
    }
  };

  return (
    <label
      title={`input ${label}`}
      className={`${wrapperClasses} ${classes ? classes : ''}`}
    >
      {isCheckbox || isRadio ? (
        <>
          {cloneElement(children as ReactElement<HTMLInputElement>, {
            type: isCheckbox ? 'checkbox' : 'radio',
          })}
          <span></span>
        </>
      ) : isTextarea ? (
        cloneElement(children as ReactElement<HTMLFormElement>, {
          ref: textareaRef,
          onChange: handleChange,
          onInput: handleTextareaInput,
          disabled: disabled,
        })
      ) : (
        cloneElement(children as ReactElement<HTMLFormElement>, {
          type: type,
          onInput: handleChange,
        })
      )}

      {label && <p>{label}</p>}
      {error && <span style={{ color: 'red' }}>{error.message}</span>}
    </label>
  );
};

export default FormControl;
