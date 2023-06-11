import {
  FC,
  useRef,
  useState,
  forwardRef,
  ChangeEvent,
  InputHTMLAttributes,
} from 'react';
import { classnames } from '../../../services/helper';

import styles from './index.module.scss';

export interface IInput extends Omit<InputHTMLAttributes<any>, 'placeholder'> {
  label?: string;
  classes?: string;
  error?: any;
}

const Input: FC<IInput> = forwardRef<HTMLInputElement, IInput>(
  ({ label, required, disabled, classes, error, ...inputProps }, ref) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<any>) => {
      setValue(event.target.value);
    };

    const isCheckbox = inputProps.type === 'checkbox';
    const isRadio = inputProps.type === 'radio';
    const isTextarea = inputProps.type === 'textarea';

    const wrapperClasses = classnames({
      [styles.full]: value,
      [styles.required]: required && !disabled,
      [styles.disabled]: disabled,
      [styles.checkbox]: isCheckbox,
      [styles.radio]: isRadio,
      [styles.default]: !isCheckbox && !isRadio,
    });

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextareaInput = () => {
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
            <input
              ref={ref}
              type={isCheckbox ? 'checkbox' : 'radio'}
              {...inputProps}
              disabled={disabled}
            />
            <span></span>
          </>
        ) : isTextarea ? (
          <textarea
            ref={textareaRef}
            {...inputProps}
            onChange={handleChange}
            onInput={handleTextareaInput}
            disabled={disabled}
          />
        ) : (
          <input
            ref={ref}
            {...inputProps}
            onChange={handleChange}
            disabled={disabled}
          />
        )}
        {label && <p>{label}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </label>
    );
  }
);

Input.displayName = 'Input';

export default Input;
