import { ChangeEvent, FC, InputHTMLAttributes, useState } from 'react';
import { classnames } from '../../../services/helper';

import styles from './index.module.scss';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<IInput> = ({ label, required, disabled, ...inputProps }) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const isCheckbox = inputProps.type === 'checkbox';

  const wrapperClasses = classnames({
    [styles.full]: value,
    [styles.required]: required && !disabled,
    [styles.disabled]: disabled,
    [styles.checkbox]: isCheckbox,
    [styles.default]: !isCheckbox,
  });

  return (
    <label title={`input ${label}`} className={wrapperClasses}>
      {isCheckbox ? (
        <>
          <input
            type="checkbox"
            {...inputProps}
            onChange={handleChange}
            disabled={disabled}
          />
          <span></span>
        </>
      ) : (
        <input {...inputProps} onChange={handleChange} disabled={disabled} />
      )}
      {label && <p>{label}</p>}
    </label>
  );
};

export default Input;
