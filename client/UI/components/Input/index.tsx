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
  const isRadio = inputProps.type === 'radio';

  const wrapperClasses = classnames({
    [styles.full]: value,
    [styles.required]: required && !disabled,
    [styles.disabled]: disabled,
    [styles.checkbox]: isCheckbox,
    [styles.radio]: isRadio,
    [styles.default]: !isCheckbox && !isRadio,
  });

  return (
    <label title={`input ${label}`} className={wrapperClasses}>
      {isCheckbox || isRadio ? (
        <>
          <input
            type={isCheckbox ? 'checkbox' : 'radio'}
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
